import { redisClient } from 'libs';
import { deleteRecursiveCmd } from 'services/s3';
import type { ReqDelete, ResDefault } from 'types/apis';

export default async function controller(req: Request<ReqDelete>, res: Response<ResDefault>, next: NextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const data = await deleteRecursiveCmd(body);
  const delKeys = await redisClient.v4.keys(`${bucket}/${path}*`);
  await Promise.all(delKeys.map(key => redisClient.v4.del(key)));
  res.json(data);
}
