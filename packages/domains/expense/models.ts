import { isUUID } from 'validator';
import { to } from '@nc/utils/async';

import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { Expense, Options } from './types';
import { format, formatMany } from './formatter';
import { readExpense, readExpenses } from './data/db-expense';

export async function getExpensesForUser(userId?: string, options?: Options): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  if (!isUUID(userId)) {
    throw BadRequest('userId property is not a valid UUID.');
  }

  const [dbError, rawExpenses] = await to(readExpenses(userId, options));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses with for user with id ${userId}`);
  }

  return formatMany(rawExpenses);
}

export async function getExpenseDetails(userId?: string, expenseId?: string): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  if (!isUUID(userId)) {
    throw BadRequest('userId property is not a valid UUID.');
  }

  if (!expenseId) {
    throw BadRequest('expenseId property is missing.');
  }

  if (!isUUID(expenseId)) {
    throw BadRequest('expenseId property is not a valid UUID.');
  }

  const [dbError, rawExpense] = await to(readExpense(expenseId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpense) {
    throw NotFound(`Could not find expense with id ${expenseId}`);
  }

  return format(rawExpense);
}
