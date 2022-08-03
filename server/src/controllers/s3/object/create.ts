import { redisClient } from 'libs';
import { createFolderCmd } from 'services/s3';
import type { ReqCreate, ResWithErrMsg } from 'types/apis';

export default async function controller(req: Request<ReqCreate>, res: Response<ResWithErrMsg>, next: NextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const data = await createFolderCmd(body);
  await redisClient.v4.del(`${bucket}/${path}`);
  res.json(data);
}
