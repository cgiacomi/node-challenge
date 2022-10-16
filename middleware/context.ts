import { randomUUID } from 'crypto';

import { NextFunction, Request, Response } from 'express';

export default function context(req: Request, res: Response, next: NextFunction) {
  const requestId: string = req.headers['x-request-id'] as string || randomUUID();
  req.id = requestId;
  res.setHeader('x-request-id', requestId);

  next();
}
