import { PassThrough } from 'stream';
import { uploadObjectCmd } from 'services/s3';
import type { NextFunction } from 'express';
import type { ReqUploadObject, ResDefault } from 'types/apis';

export default async function controller(req: ReqUploadObject, res: ResDefault, next: NextFunction) {
  const params = req.query;
  const fileStream = new PassThrough();
  req.pipe(fileStream);
  const data = await uploadObjectCmd(params, fileStream);
  res.json(data);
}
