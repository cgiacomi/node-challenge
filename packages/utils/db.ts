import { Client } from 'pg';
import config from 'config';

let db;

export interface Filter {
  [index: string]: any
}

export const connect = () => {
  db = new Client(config.db);
  return db.connect();
};

export const query = async (queryString: string, parameters?: any) => {
  if (!db) await connect();

  return db.query(queryString, parameters);
};

export const offsetParser = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

export const filterParser = (filter?: Filter): [string, string[]] => {
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

export const sortParser = (sort?: string): [string, string[]] => {
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
