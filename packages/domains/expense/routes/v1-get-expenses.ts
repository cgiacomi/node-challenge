import { ApiError } from '@nc/utils/errors';
import { Filter } from '../types';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

import { getExpensesForUser, Options } from '../models';
import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

type QueryParams = {
  userId: string
  page: string
  limit: string
  filter: Filter
};

router.get('/expenses-for-user', async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const userId = req.query?.userId;
  const page = Math.abs(parseInt(req.query?.page)) || 1;
  const limit = Math.abs(parseInt(req.query?.limit)) || 10;

  const opts: Options = { page, limit, filter: req.query?.filter };

  const [expenseError, expenseDetails] = await to(getExpensesForUser(userId, opts));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({});
  }

  return res.json(secureTrim(expenseDetails));
});
