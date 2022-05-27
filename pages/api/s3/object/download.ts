import archiver from 'archiver';
import { downloadObjectCmd } from 's3/bucketCmds';
import type { NextApiResponse, PageConfig } from 'next';
import type internal from 'stream';
import type { ReqDownloadObjects } from 'types/apis';

export default async function handler(req: ReqDownloadObjects, res: NextApiResponse) {
  const { bucket, path, filenames } = req.body;

  // 단일 파일
  if (!Array.isArray(filenames)) {
    const filename = filenames;
    const data = await downloadObjectCmd({ bucket, path, filename });
    const body = data.body as internal.Readable;
    const size = data.size;
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURI(filename)}"`);
    res.setHeader('Content-Length', size);
    body.pipe(res);
    return;
  }
  // 다중 파일 or [폴더, 아직 구현 x]
  const zip = archiver('zip', { zlib: { level: 0 } });
  const zipName = path ? encodeURI(path.split('/').at(-2)) : 'index';
  res.setHeader('Content-Disposition', `attachment; filename="${zipName}.zip"`);
  res.setHeader('Content-Type', 'application/zip');
  zip.pipe(res);
  for (const filename of filenames) {
    console.log(filename);
    const data = await downloadObjectCmd({ bucket, path, filename });
    if (!data.success) continue;
    const body = data.body as internal.Readable;
    zip.append(body, { name: filename });
  }
  zip.finalize();

}

export const config: PageConfig = {
  api: {
    responseLimit: false,
  },
};
