import { capitalize, upper } from '@nc/utils/capitalize';
import { CleanExpense, Expense } from './types';

export function secureTrimMany(expenses: Expense[]): CleanExpense[] {
  const trimmedItems: CleanExpense[] = [];

  expenses.forEach((exp: Expense) => {
    trimmedItems.push(secureTrim(exp));
  });

  return trimmedItems;
}

export function secureTrim(expense: Expense): CleanExpense {
  // Using JSON.stringify() to filter out unwanted fields has the side effect
  // of converting the object to a string, which will break the specified
  // 'Content-Type' header which is set to application/json.
  // Instead by using Destructuring assignment we can safely keep a real object
  // with only the fields we want. It ofc reads a bit strange but it works best.

  // eslint-disable-next-line
  const { id, user_id, date_created, ...cleanExpense } = expense;

  return cleanExpense;
}

export function formatMany(rawExpenses: Expense[]): Expense[] {
  const formattedItems: Expense[] = [];

  rawExpenses.forEach((rawExpense) => {
    formattedItems.push(format(rawExpense));
  });

  return formattedItems;
}

export function format(rawExpense: Expense): Expense {
  return {
    id: rawExpense.id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: capitalize(rawExpense.currency),
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: upper(rawExpense.status),
  };
}
