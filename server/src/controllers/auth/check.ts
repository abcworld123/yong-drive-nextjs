import { check } from 'services/auth/login';

// first check
export default async function controller(req: Request, res: Response, next: NextFunction) {
  const isLogin = req.session.isLogin === true || await check(req);
  res.json({ success: isLogin });
}
