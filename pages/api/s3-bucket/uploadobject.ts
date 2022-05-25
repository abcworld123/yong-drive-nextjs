import nc from 'next-connect';
import { putObjectCmd } from '@s3/bucketCmds';
import { writeFileToLocal } from 'services/local/fileIo';
import { ReqLocalWrite } from 'types/apis';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc();
handler.use(writeFileToLocal);

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('abc');
});

handler.post(async (req: ReqLocalWrite, res: NextApiResponse) => {
  const data = await putObjectCmd({ ...req.body, ...req.file });
  res.status(200).json(data);
}
);

export const config = { api: { bodyParser: false } };

export default handler;
