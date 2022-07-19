import { getObjectListCmd } from 'services/s3';
import type { NextFunction } from 'express';
import type { ReqCreateFolderObjects, ResDefault } from 'types/apis';

export default async function controller(req: ReqCreateFolderObjects, res: ResDefault, next: NextFunction) {
  const params = req.query;
  const data = await getObjectListCmd(params);
  res.json(data);
}
