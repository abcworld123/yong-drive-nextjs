import { getObjectListCmd } from 's3/bucketCmds';
import type { NextApiResponse } from 'next';
import type { ReqBucket, ResObjectList } from 'types/apis';

export default async function handler(req: ReqBucket, res: NextApiResponse<ResObjectList>) {
  const params = req.query;
  const data = await getObjectListCmd(params);
  res.status(200).json(data);
}
