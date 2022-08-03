import { compareSync } from 'bcrypt';
import config from 'config';
import type { ReqLogin } from 'types/apis';

// login page
export default function controller(req: Request<ReqLogin>, res: Response, next: NextFunction) {
  const { pw } = req.body;
  if (compareSync(pw, config.auth.pw)) {
    req.session.isLogin = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}
