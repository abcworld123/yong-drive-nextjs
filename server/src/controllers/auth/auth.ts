// all page middleware
export default function controller(req: Request, res: Response, next: NextFunction) {
  if (req.session.isLogin) { next(); return; }
  if (regex.some(x => x.test(req.url))) next();
  else res.status(401).end();
}

const whitelist = ['/auth/login', '/auth/check'];  // todo 'share'
const regex = whitelist.map(path => new RegExp(`^${path}`));
