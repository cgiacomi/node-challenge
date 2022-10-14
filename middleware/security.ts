import { NextFunction, Request, Response } from 'express';

export default function security(req: Request, res: Response, next: NextFunction) {
  res.removeHeader('X-Powered-By');

  if (decodeURIComponent(req.url).includes('<script>')) {
    return res.status(406).end('Illegal component in URI');
  }

  next();
}
