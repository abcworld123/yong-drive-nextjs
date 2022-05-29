import archiver from 'archiver';
import { downloadFileCmd, downloadRecursiveCmd, getObjectListCmd } from 's3/bucketCmds';
import type { NextApiResponse, PageConfig } from 'next';
import type { DownloadFormdata, DownloadSingleFormdata, ReqDownloadObjects } from 'types/apis';

// download single file
async function sendSingleFile(res: NextApiResponse, formdata: DownloadSingleFormdata) {
  const { body, size } = await downloadFileCmd(formdata);
  res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(formdata.filename)}"`);
  res.setHeader('Content-Length', size);
  body.pipe(res);
}

// download single folder as zip
async function sendSingleFolder(res: NextApiResponse, formdata: DownloadSingleFormdata, zipName: string) {
  const { bucket, path, filename } = formdata;
  const { success, objects } = await getObjectListCmd({ bucket, path: path + filename });
  if (!success) res.status(500).send(null);
  else {
    const filenamesInFoler = objects.map((object) => object.name);
    sendZip(res, { bucket, path: path + filename, filenames: filenamesInFoler }, zipName);
  }
}

// download multiple objects as zip
async function sendZip(res: NextApiResponse, formdata: DownloadFormdata, zipName: string) {
  const { bucket, path, filenames } = formdata;
  const zip = archiver('zip', { zlib: { level: 1 } });
  res.setHeader('Content-Disposition', `attachment; filename="${zipName}.zip"`);
  res.setHeader('Content-Type', 'application/zip');
  zip.pipe(res);
  const search = downloadRecursiveCmd({ bucket, baseSrc: path, path: '', filenames });
  while (1) {
    const { value, done } = await search.next();
    if (!value || done) break;
    if (!value.success) continue;
    const { body, filename } = value;
    zip.append(body, { name: filename });
  }
  zip.finalize();
}

export default async function handler(req: ReqDownloadObjects, res: NextApiResponse) {
  const { bucket, path } = req.body;
  const filenames: string[] = JSON.parse(req.body.filenames);

  if (filenames.length === 1) {
    const filename = filenames[0];
    if (filename.at(-1) !== '/') {  // single file
      sendSingleFile(res, { bucket, path, filename });
    } else {  // single folder
      const zipName = encodeURI(filename.slice(0, -1));
      sendSingleFolder(res, { bucket, path, filename }, zipName);
    }
  } else {  // multiple
    const zipName = path ? encodeURI(path.split('/').at(-2)) : 'index';
    sendZip(res, { bucket, path, filenames }, zipName);
  }
}

export const config: PageConfig = {
  api: {
    responseLimit: false,
  },
};
