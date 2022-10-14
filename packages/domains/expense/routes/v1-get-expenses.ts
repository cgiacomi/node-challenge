import { ApiError } from '@nc/utils/errors';
import { getExpensesForUser } from '../models';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

import { Filter, Options } from '../types';
import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

type QueryParams = {
  userId: string
  filter: Filter
  sort: string
  page: string
  limit: string
};

router.get('/expenses-for-user', async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const userId = req.query?.userId;
  const page = Math.abs(parseInt(req.query?.page)) || 1;
  const limit = Math.abs(parseInt(req.query?.limit)) || 10;

  const opts: Options = { page, limit, filter: req.query?.filter, sort: req.query?.sort };

  const [expenseError, expenseDetails] = await to(getExpensesForUser(userId, opts));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({});
  }

  return res.json(secureTrim(expenseDetails));
});
