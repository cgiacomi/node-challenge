import { ApiError } from '@nc/utils/errors';
import { getUserDetails } from '../model';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

router.get('/get-user-details', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query?.userId as string;
  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(secureTrim(userDetails));
});
