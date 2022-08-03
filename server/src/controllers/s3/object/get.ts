import { redisClient } from 'libs';
import { getObjectListCmd } from 'services/s3';
import type { ReqGet, ResObjectList } from 'types/apis';

export default async function controller(req: Request<ReqGet>, res: Response<ResObjectList>, next: NextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const cached: string = await redisClient.v4.get(`${bucket}/${path}`);

  if (cached) {
    const data = { success: true, objects: JSON.parse(cached) };
    res.json(data);
  } else {
    const data = await getObjectListCmd(body);
    redisClient.v4.setEx(`${bucket}/${path}`, 86400, JSON.stringify(data.objects));
    res.json(data);
  }
}
