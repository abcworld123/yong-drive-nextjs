import { getObjectListCmd } from '@s3/bucketCmds';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ReqBucketParams, ResObjectList } from 'types/apis';

export default async function handler(req: NextApiRequest & ReqBucketParams, res: NextApiResponse<ResObjectList>) {
  const bucketParams = req.query;
  const data = await getObjectListCmd(bucketParams);
  res.status(200).json(data);
}
