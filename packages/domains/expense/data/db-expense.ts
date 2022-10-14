import format = require('pg-format')

import { Expense, Options } from '../types';
import { filterParser, offsetParser, query, sortParser } from '@nc/utils/db';

const queryParser = (userId: string, options?: Options): string => {
  let queryArgs: any[] = [userId];

  const offset = offsetParser(options.page, options.limit);
  const [filterClause, filterValues] = filterParser(options.filter);
  const [orderClause, orderValues] = sortParser(options.sort);

  // NOTE: this is not injection safe BUT we will make sure it is before sending it to the DB.
  const constructedQuery = `SELECT * FROM expenses WHERE user_id = %L${filterClause}${orderClause} LIMIT %s OFFSET %s`;
  queryArgs = queryArgs.concat(filterValues, orderValues, options.limit, offset);

  // format() behaves like PostgreSQL's https://www.postgresql.org/docs/9.3/functions-string.html#FUNCTIONS-STRING-FORMAT
  const safeSql = format(constructedQuery, ...queryArgs);

  return safeSql;
};

export function readExpense(userId: string, options?: Options): Promise<Expense[]> {
  const safeSql = queryParser(userId, options);

  return query(safeSql)
    .then((response) => response.rows);
}
