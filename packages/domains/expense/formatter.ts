import { Expense } from './types';

const publicFields = ['merchant_name', 'amount_in_cents', 'currency', 'status'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrimMany(expenses: Expense[]): string[] {
  const trimmedItems: Array<string> = [];

  expenses.forEach((exp: Expense) => {
    trimmedItems.push(JSON.stringify(exp, publicFields));
  });

  return trimmedItems;
}

export function formatMany(rawExpenses: Expense[]): Expense[] {
  const formattedItems: Array<Expense> = [];

  rawExpenses.forEach((exp: Expense) => {
    formattedItems.push({
      id: exp.id,
      merchant_name: capitalize(exp.merchant_name),
      amount_in_cents: exp.amount_in_cents,
      currency: capitalize(exp.currency),
      user_id: exp.user_id,
      date_created: exp.date_created,
      status: exp.status,
    });
  });

  return formattedItems;
}
