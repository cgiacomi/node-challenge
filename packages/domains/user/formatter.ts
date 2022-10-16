import { capitalize } from '@nc/utils/capitalize';

import { CleanUser, User } from './types';

export function secureTrim(user: User): CleanUser {
  // Using JSON.stringify() to filter out unwanted fields has the side effect
  // of converting the object to a string, which will break the specified
  // 'Content-Type' header which is set to application/json.
  // Instead by using Destructuring assignment we can safely keep a real object
  // with only the fields we want. It ofc reads a bit strange but it works best.

  // eslint-disable-next-line
  const { id, ssn, ...cleanUser } = user;

  return cleanUser;
}

export function format(rawUser: User): User {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}
