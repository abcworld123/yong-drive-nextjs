import { getObjectListCmd } from '@s3/bucketCmds';
import type { NextApiResponse } from 'next';
import type { ReqBucket, ResObjectList } from 'types/apis';

export default async function handler(req: ReqBucket, res: NextApiResponse<ResObjectList>) {
  const bucketParams = req.query;
  const data = await getObjectListCmd(bucketParams);
  res.status(200).json(data);
}
