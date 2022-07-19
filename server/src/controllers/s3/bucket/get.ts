import { getBucketListCmd } from 'services/s3';
import type { NextFunction, Request } from 'express';
import type { ResBucketList } from 'types/apis';

export default async function controller(req: Request, res: ResBucketList, next: NextFunction) {
  const data = await getBucketListCmd();
  req.
  res.json(data);
}
