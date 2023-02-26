import { redisClient } from 'libs';

export async function check(req: Request) {
  const cid = req.cookies?.cid;
  const isLogin = cid ? (await redisClient.v4.get(cid)) !== null : false;
  return isLogin;
}
