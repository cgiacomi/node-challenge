import { ApiError } from '@nc/utils/errors';
import { to } from '@nc/utils/async';

import { getAllUserDetails, getUserDetails } from '../model';
import { NextFunction, Request, Response, Router } from 'express';
import { secureTrim, secureTrimMany } from '../formatter';

export const router = Router();

type QueryParams = {
  userId: string
};

export const getAllUsers = async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const [error, usersDetails] = await to(getAllUserDetails());

  if (error) {
    return next(new ApiError(error, error.status, `Could not get all users details: ${error}`, error.title, req));
  }

  if (!usersDetails) {
    return res.json({ data: [] });
  }

  return res.json({ data: secureTrimMany(usersDetails) });
};

export const getUser = async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const [error, userDetails] = await to(getUserDetails(userId));

  if (error) {
    return next(new ApiError(error, error.status, `Could not get user details: ${error}`, error.title, req));
  }

  if (!userDetails) {
    return res.json({ data: {} });
  }

  return res.json({ data: secureTrim(userDetails) });
};
