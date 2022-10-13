import { Expense } from './types';
import { format } from './formatter';
import { isUUID } from 'validator';
import { readExpense } from './data/db-expense';
import { to } from '@nc/utils/async';

import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export interface Options {
  page: number
  limit: number
}

export async function getExpensesForUser(userId?: string, options?: Options): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  if (!isUUID(userId)) {
    throw BadRequest('userId property is not a valid UUID.');
  }

  const [dbError, rawExpenses] = await to(readExpense(userId, { page: options.page, limit: options.limit }));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses with for user with id ${userId}`);
  }

  return format(rawExpenses);
}
