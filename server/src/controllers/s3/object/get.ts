import { getObjectListCmd } from 'services/s3';
import type { ReqGet, ResObjectList } from 'types/apis';

export default async function controller(req: Request<ReqGet>, res: Response<ResObjectList>, next: NextFunction) {
  const body = req.body;
  const data = await getObjectListCmd(body);
  res.json(data);
}
