import { getBucketListCmd } from 'services/s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResBucketList } from 'types/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResBucketList>) {
  const data = await getBucketListCmd();
  res.status(200).json(data);
}
