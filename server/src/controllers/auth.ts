export default function controller(req: Request, res: Response, next: NextFunction) {
  if (req.session['isLogin']) { next(); return; }
  const page = req.url.slice(1).split('/')[0];
  if (whitelist.includes(page)) next();
  else res.status(401).end();
}

const whitelist = ['login'];
