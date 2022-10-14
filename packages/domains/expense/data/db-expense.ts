import format = require('pg-format')

import { query } from '@nc/utils/db';

import { Expense, Filter, Options } from '../types';

const offsetParser = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

const filterParser = (filter?: Filter): [string, string[]] => {
  let filterClause = '';
  const filterValues: string[] = [];

  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      filterClause += ` AND ${key} = %L`;
      filterValues.push(filter[key]);
    }
  }

  return [filterClause, filterValues];
};

const sortParser = (sort?: string): [string, string[]] => {
  if (sort) {
    let sortClause = ' ORDER BY ';
    const sortValues: string[] = [];

    const args = sort.split(',');

    for (const [index, value] of args.entries()) {
      let sortOrder = ' ASC';
      let propertyName = value;
      const separator = ', ';

      const descending: boolean = propertyName.startsWith('-');
      if (descending) {
        propertyName = propertyName.substring(1);
        sortOrder = ' DESC';
      }

      if (index > 0 && index < args.length) {
        sortClause += separator;
      }
      sortClause += `%I${sortOrder}`;
      sortValues.push(propertyName);
    }

    return [sortClause, sortValues];
  }

  return ['', []];
};

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
