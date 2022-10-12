import { capitalize, upper } from '@nc/utils/capitalize';
import { CleanExpense, Expense } from './types';

export function secureTrim(expenses: Expense[]): CleanExpense[] {
  const trimmedItems: Array<CleanExpense> = [];

  expenses.forEach((exp: Expense) => {
    // Using JSON.stringify() to filter out unwanted fields has the side effect
    // of converting the object to a string, which will break the specified
    // 'Content-Type' header which is set to application/json.
    // Instead by using Destructuring assignment we can safely keep a real object
    // with only the fields we want. It ofc reads a bit strange but it works best.

    // eslint-disable-next-line
    const { id, user_id, date_created, ...cleanExpense } = exp;

    trimmedItems.push(cleanExpense);
  });

  return trimmedItems;
}

export function format(rawExpenses: Expense[]): Expense[] {
  const formattedItems: Array<Expense> = [];

  rawExpenses.forEach((exp: Expense) => {
    formattedItems.push({
      id: exp.id,
      merchant_name: capitalize(exp.merchant_name),
      amount_in_cents: exp.amount_in_cents,
      currency: capitalize(exp.currency),
      user_id: exp.user_id,
      date_created: exp.date_created,
      status: upper(exp.status),
    });
  });

  return formattedItems;
}
