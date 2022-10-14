import { isUUID } from 'validator';
import { to } from '@nc/utils/async';
import { User } from './types';

import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { format, formatMany } from './formatter';
import { readAllUsers, readUser } from './data/db-user';

export async function getAllUserDetails(): Promise<User[]> {
  const [dbError, rawUsers] = await to(readAllUsers());

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawUsers) {
    throw NotFound('Could not find users');
  }

  return formatMany(rawUsers);
}

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
