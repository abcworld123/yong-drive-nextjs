import { createFolderCmd } from 'services/s3';
import type { NextFunction } from 'express';
import type { ReqCreateFolderObjects, ResDefault } from 'types/apis';

export default async function controller(req: ReqCreateFolderObjects, res: ResDefault, next: NextFunction) {
  const formdata = req.body;
  const data = await createFolderCmd(formdata);
  res.json(data);
}
