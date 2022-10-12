import { query } from '@nc/utils/db';
import { User } from '../types';

export function readUser(userId: string): Promise<User> {
  return query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response.rows?.[0]);
}
