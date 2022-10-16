import { format } from './formatter';
import { isUUID } from 'validator';
import { readUser } from './data/db-user';
import { to } from '@nc/utils/async';
import { User } from './types';

import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserDetails(userId?: string): Promise<User> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  if (!isUUID(userId)) {
    throw BadRequest('userId property is not a valid UUID.');
  }

  const [dbError, rawUser] = await to(readUser(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUser) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return format(rawUser);
}
