// first check
export default function controller(req: Request, res: Response, next: NextFunction) {
  const isLogin = req.session.isLogin;
  res.json({ success: isLogin || false });
}
