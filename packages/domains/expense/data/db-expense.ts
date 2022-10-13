import { Expense } from '../types';

import { query, QueryOptions } from '@nc/utils/db';

export function readExpense(userId: string, options: QueryOptions): Promise<Expense[]> {
  const offset = (options.page - 1) * options.limit;

  return query('SELECT * FROM expenses WHERE user_id = $1 LIMIT $2 OFFSET $3', [userId, options.limit, offset])
    .then((response) => response.rows);
}
