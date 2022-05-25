import { PassThrough } from 'stream';
import { uploadCmd } from '@s3/bucketCmds';
import type { NextApiResponse } from 'next';
import type { ReqUpload } from 'types/apis';

export default async function handler(req: ReqUpload, res: NextApiResponse) {
  const params = req.query;
  const fileStream = new PassThrough();
  req.pipe(fileStream);
  const data = await uploadCmd(params, fileStream);
  res.status(200).json(data);
}

export const config = { api: { bodyParser: false } };
