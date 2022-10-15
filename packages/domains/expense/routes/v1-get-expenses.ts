import { ApiError } from '@nc/utils/errors';
import { Filter } from '@nc/utils/db';
import { Options } from '../types';
import { to } from '@nc/utils/async';

import { getExpenseDetails, getExpensesForUser } from '../models';
import { NextFunction, Request, Response, Router } from 'express';
import { secureTrim, secureTrimMany } from '../formatter';

export const router = Router();

type QueryParams = {
  userId: string
  filter: Filter
  sort: string
  page: string
  limit: string
};

export const getAllExpenses = async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const userId = req.query?.userId;
  const page = Math.abs(parseInt(req.query?.page)) || 1;
  const limit = Math.abs(parseInt(req.query?.limit)) || 10;

  // const authenticatedUser = req.user; // This line is here to showcase how one can retrieve the authenticated user in the route handler.

  const opts: Options = { page, limit, filter: req.query?.filter, sort: req.query?.sort };

  const [expenseError, expenseDetails] = await to(getExpensesForUser(userId, opts));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({ data: [] });
  }

  return res.json({ data: secureTrimMany(expenseDetails) });
};

export const getExpense = async (req: Request<any, any, any, QueryParams>, res: Response, next: NextFunction) => {
  const expenseId = req.params.expenseId;
  const [expenseError, expenseDetails] = await to(getExpenseDetails(expenseId));

  // const authenticatedUser = req.user; // This line is here to showcase how one can retrieve the authenticated user in the route handler.

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get expense details: ${expenseError}`, expenseError.title, req));
  }

  if (!expenseDetails) {
    return res.json({ data: [] });
  }

  return res.json({ data: secureTrim(expenseDetails) });
};
