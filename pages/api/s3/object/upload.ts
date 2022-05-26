import { PassThrough } from 'stream';
import { uploadObjectCmd } from '@s3/bucketCmds';
import type { NextApiResponse } from 'next';
import type { ReqUploadObject, ResDefault } from 'types/apis';

export default async function handler(req: ReqUploadObject, res: NextApiResponse<ResDefault>) {
  const params = req.query;
  const fileStream = new PassThrough();
  req.pipe(fileStream);
  const data = await uploadObjectCmd(params, fileStream);
  res.status(200).json(data);
}

export const config = { api: { bodyParser: false } };
