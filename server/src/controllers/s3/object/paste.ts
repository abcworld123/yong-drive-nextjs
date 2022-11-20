import { redisClient } from 'libs';
import { pasteObjectCmd } from 'services/s3';
import type { ReqPaste, ResDefault } from 'types/apis';

export default async function controller(req: Request<ReqPaste>, res: Response<ResDefault>, next: NextFunction) {
  const body = req.body;
  const { bucket, mode, pathFrom, pathTo } = body;
  const data = await pasteObjectCmd(body);
  if (mode === 'cut') {
    await redisClient.v4.del(`${bucket}/${pathFrom}`);
  }
  await redisClient.v4.del(`${bucket}/${pathTo}`);
  res.json(data);
}
