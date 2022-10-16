import { Expense } from '../types';

import { formatMany, secureTrimMany } from '../formatter';

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return instances of expenses that fits the API model, based on the db raw value', () => {
    const now = new Date().toISOString();

    const expenses: Array<Expense> = [
      {
        id: 'dummy-id',
        merchant_name: 'apple',
        amount_in_cents: '5000',
        currency: 'dkk',
        user_id: 'dummy-user-id',
        date_created: now,
        status: 'pending',
      },
    ];

    return expect(formatMany(expenses)).toEqual([
      {
        id: 'dummy-id',
        merchant_name: 'Apple',
        amount_in_cents: '5000',
        currency: 'Dkk',
        user_id: 'dummy-user-id',
        date_created: now,
        status: 'PENDING',
      },
    ]);
  });
});

describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    const now = new Date().toISOString();

    const expenses: Array<Expense> = [
      {
        id: 'dummy-id',
        merchant_name: 'apple',
        amount_in_cents: '5000',
        currency: 'dkk',
        user_id: 'dummy-user-id',
        date_created: now,
        status: 'pending',
      },
    ];

    return expect(secureTrimMany(expenses)).toEqual(
      [
        {
          merchant_name: 'apple',
          amount_in_cents: '5000',
          currency: 'dkk',
          status: 'pending',
        },
      ]
    );
  });
});
