import { getBucketListCmd } from 'services/s3';
import type { ResBucketList } from 'types/apis';

export default async function controller(req: Request, res: Response<ResBucketList>, next: NextFunction) {
  const data = await getBucketListCmd();
  res.json(data);
}
