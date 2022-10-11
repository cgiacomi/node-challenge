import { ApiError } from '@nc/utils/errors';
import { getExpensesForUser } from '../models';
import { secureTrimMany } from '../formatter';
import { to } from '@nc/utils/async';

import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

router.get('/expenses-for-user', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query?.userId as string;
  const [expenseError, expenseDetails] = await to(getExpensesForUser(userId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({});
  }

  return res.json(secureTrimMany(expenseDetails));
});
