import archiver from 'archiver';
import { downloadObjectCmd, downloadRecursiveCmd, getObjectListCmd } from 's3/bucketCmds';
import type { NextApiResponse, PageConfig } from 'next';
import type { ReqDownloadObjects } from 'types/apis';

export default async function handler(req: ReqDownloadObjects, res: NextApiResponse) {
  const { bucket, path, filenames } = req.body;
  // 단일 object
  if (!Array.isArray(filenames)) {
    const filename = filenames;

    if (filenames.at(-1) !== '/') {  // 파일
      const { body, size } = await downloadObjectCmd({ bucket, path, filename });
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(filename)}"`);
      res.setHeader('Content-Length', size);
      body.pipe(res);
      return;
    } else {  // 폴더
      const zip = archiver('zip', { zlib: { level: 1 } });
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(filename.slice(0, -1))}.zip"`);
      res.setHeader('Content-Type', 'application/zip');
      zip.pipe(res);
      const deepFilenames = (await getObjectListCmd({ bucket, path: path + filename })).objects.map((object) => object.name);
      const gen = downloadRecursiveCmd({ bucket, basePath: path + filename, curPath: '', filenames: deepFilenames });
      while (1) {
        const { value, done } = await gen.next();
        if (!value || done) break;
        if (!value.success) continue;
        const { body, filename } = value;
        zip.append(body, { name: filename });
      }
      zip.finalize();
      return;
    }
  }
  // 다중 파일 or 폴더
  const zip = archiver('zip', { zlib: { level: 1 } });
  const zipName = path ? encodeURI(path.split('/').at(-2)) : 'index';
  res.setHeader('Content-Disposition', `attachment; filename="${zipName}.zip"`);
  res.setHeader('Content-Type', 'application/zip');
  zip.pipe(res);
  const gen = downloadRecursiveCmd({ bucket, basePath: path, curPath: '', filenames });
  while (1) {
    const { value, done } = await gen.next();
    if (!value || done) break;
    if (!value.success) continue;
    const { body, filename } = value;
    zip.append(body, { name: filename });
  }
  zip.finalize();
}

export const config: PageConfig = {
  api: {
    responseLimit: false,
  },
};
