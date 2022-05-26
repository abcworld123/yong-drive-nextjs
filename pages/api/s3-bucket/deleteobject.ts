import { deleteObjectCmd } from '@s3/bucketCmds';
import type { NextApiResponse } from 'next';
import type { ReqDeleteObjects, ResBucketList } from 'types/apis';

export default async function handler(req: ReqDeleteObjects, res: NextApiResponse<ResBucketList>) {
  const formdata = req.body;
  const data = await deleteObjectCmd(formdata);
  res.status(200).json(data);
}
