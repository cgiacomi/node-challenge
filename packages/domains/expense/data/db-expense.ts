import { Expense, Filter } from '../types';
import { PagingOptions, query } from '@nc/utils/db';

const filterParser = (filter?: Filter): string => {
  let filterClause = '';

  if (filter?.merchantName) {
    filterClause += `AND merchant_name LIKE '${filter.merchantName}'`;
  }
  if (filter?.currency) {
    filterClause += `AND currency LIKE '${filter.currency}'`;
  }
  if (filter?.status) {
    filterClause += `AND status LIKE '${filter.status}'`;
  }

  return filterClause;
};

export function readExpense(userId: string, paging: PagingOptions, filter?: Filter): Promise<Expense[]> {
  const offset = (paging.page - 1) * paging.limit;

  const filterClause = filterParser(filter);

  return query(`SELECT * FROM expenses WHERE user_id = $1 ${filterClause} LIMIT $2 OFFSET $3`, [userId, paging.limit, offset])
    .then((response) => response.rows);
}
