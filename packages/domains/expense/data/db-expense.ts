import { Expense } from '../types';
import { query } from '@nc/utils/db';

export function readExpense(userId: string): Promise<Expense[]> {
  return query('SELECT * FROM expenses WHERE user_id = $1', [userId])
    .then((response) => response.rows);
}
