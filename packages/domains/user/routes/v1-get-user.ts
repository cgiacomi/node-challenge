import { getUserDetails } from '../model';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

import { ApiError, BadRequest } from '@nc/utils/errors';
import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

type QueryParams = {
  userId: string
};

export const getUser = async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const authenticatedUser = req.user;

  const userId = req.params.userId;
  if (userId !== authenticatedUser.userId) {
    const badRequest = BadRequest('userId does not match authenticated user');
    return next(new ApiError(badRequest, badRequest.status, `Could not get user details: ${badRequest}`, badRequest.title, req));
  }

  const [error, userDetails] = await to(getUserDetails(userId));

  if (error) {
    return next(new ApiError(error, error.status, `Could not get user details: ${error}`, error.title, req));
  }

  if (!userDetails) {
    return res.json({ data: {} });
  }

  return res.json({ data: secureTrim(userDetails) });
};
