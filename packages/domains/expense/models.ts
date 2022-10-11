import { Expense } from './types';
import { formatMany } from './formatter';
import { readExpense } from './data/db-expense';
import { to } from '@nc/utils/async';

import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getExpensesForUser(userId?: string): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readExpense(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses with for user with id ${userId}`);
  }

  return formatMany(rawExpenses);
}
