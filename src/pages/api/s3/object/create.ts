import { createFolderCmd } from 'services/s3';
import type { NextApiResponse } from 'next';
import type { ReqCreateFolderObjects, ResDefault } from 'types/apis';

export default async function handler(req: ReqCreateFolderObjects, res: NextApiResponse<ResDefault>) {
  const formdata = req.body;
  const data = await createFolderCmd(formdata);
  res.status(200).json(data);
}
