import { deleteRecursiveCmd } from 'services/s3';
import type { NextFunction } from 'express';
import type { ReqDeleteObjects, ResDefault } from 'types/apis';

export default async function controller(req: ReqDeleteObjects, res: ResDefault, next: NextFunction) {
  const formdata = req.body;
  const data = await deleteRecursiveCmd(formdata);
  res.json(data);
}
