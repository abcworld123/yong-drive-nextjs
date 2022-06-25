import { deleteRecursiveCmd } from 'services/s3';
import type { NextApiResponse } from 'next';
import type { ReqDeleteObjects, ResDefault } from 'types/apis';

export default async function handler(req: ReqDeleteObjects, res: NextApiResponse<ResDefault>) {
  const formdata = req.body;
  const data = await deleteRecursiveCmd(formdata);
  res.status(200).json(data);
}
