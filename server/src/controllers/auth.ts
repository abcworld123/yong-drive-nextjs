import { compareSync } from 'bcrypt';
import config from 'config';
import type { ReqLogin } from 'types/apis';

const whitelist = ['login', 'check'];  // todo 'share'

// login page
export function login(req: Request<ReqLogin>, res: Response, next: NextFunction) {
  const { pw } = req.body;
  if (compareSync(pw, config.auth.pw)) {
    req.session.isLogin = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}

// first check
export function check(req: Request, res: Response, next: NextFunction) {
  const isLogin = req.session.isLogin;
  res.json({ success: isLogin || false });
}

// all page middleware
export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.session.isLogin) { next(); return; }
  const page = req.url.slice(1).split('/')[0];
  if (whitelist.includes(page)) next();
  else res.status(401).end();
}
