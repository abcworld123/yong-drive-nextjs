import archiver from 'archiver';
import { downloadFileCmd, downloadRecursiveCmd, getObjectListCmd } from 'services/s3';
import type { DownloadBody, DownloadSingleParams, ReqDownload } from 'types/apis';

// download single file
async function sendSingleFile(res: Response, params: DownloadSingleParams) {
  const { body, size } = await downloadFileCmd(params);
  if (!body) res.end();
  else {
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(params.filename)}"`);
    res.setHeader('Content-Length', size);
    body.pipe(res);
  }
}

// download single folder as zip
async function sendSingleFolder(res: Response, params: DownloadSingleParams, zipName: string) {
  const { bucket, path, filename } = params;
  const { success, objects } = await getObjectListCmd({ bucket, path: path + filename });
  if (!success) res.status(500).end();
  else {
    const filenamesInFoler = objects.map((object) => object.name);
    sendZip(res, { bucket, path: path + filename, filenames: filenamesInFoler }, zipName);
  }
}

// download multiple objects as zip
async function sendZip(res: Response, params: DownloadBody, zipName: string) {
  const { bucket, path, filenames } = params;
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

export default async function controller(req: Request<ReqDownload>, res: Response, next: NextFunction) {
  const { bucket, path } = req.body;
  const filenames: string[] = JSON.parse(req.body.filenames);

  if (filenames.length === 1) {
    const filename = filenames[0];
    if (filename.at(-1) !== '/') {  // single file
      await sendSingleFile(res, { bucket, path, filename });
    } else {  // single folder
      const zipName = encodeURI(filename.slice(0, -1));
      await sendSingleFolder(res, { bucket, path, filename }, zipName);
    }
  } else {  // multiple
    const zipName = path ? encodeURI(path.split('/').at(-2)) : 'index';
    await sendZip(res, { bucket, path, filenames }, zipName);
  }
  res.on('finish', res.end);
}
