import type { ReqLogin } from 'types/apis';
import config from 'config';

export default function controller(req: Request<ReqLogin>, res: Response, next: NextFunction) {
  const { pw } = req.body;
  if (pw === config.auth.pw) {
    req.session['isLogin'] = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}
