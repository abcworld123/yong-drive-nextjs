import { PassThrough } from 'stream';
import { uploadObjectCmd } from 'services/s3';
import type { ReqUpload, ResDefault } from 'types/apis';

export default async function controller(req: Request<ReqUpload>, res: Response<ResDefault>, next: NextFunction) {
  const params = req.query;
  const fileStream = new PassThrough();
  req.pipe(fileStream);
  const data = await uploadObjectCmd(params, fileStream);
  res.json(data);
}
