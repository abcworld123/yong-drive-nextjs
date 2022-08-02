import { deleteRecursiveCmd } from 'services/s3';
import type { ReqDelete, ResDefault } from 'types/apis';

export default async function controller(req: Request<ReqDelete>, res: Response<ResDefault>, next: NextFunction) {
  const body = req.body;
  const data = await deleteRecursiveCmd(body);
  res.json(data);
}
