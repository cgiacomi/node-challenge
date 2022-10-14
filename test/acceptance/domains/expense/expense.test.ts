import { Api } from '../../utils/api';
import assert from 'assert';

describe('Given existing expenses for a user in the database', () => {
  describe('Get expenses for a specific user', () => {
    test('Expense route should return a valid collection of expenses with a valid user id', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
    });

    test('Expense route should return an empty collection with a non existing user id', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a471');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 0);
    });
  });

  describe('Get expenses for an invalid userId in the request', () => {
    test('Expense route should return an error of type 400', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=111');
      assert.equal(res.statusCode, 400);
    });
  });

  describe('Get expenses for a specific user and limit the results', () => {
    test('Expense route should return 1 result when limit is set to 1', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
    });

    test('Expense route should return 2 result when limit is set to 2', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=2');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 2);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
    });

    test('Expense route should return the default number of results when limit is set to 0', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=0');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
    });

    test('Expense route should return the absolute value of results when limit is set to a negative number', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=-1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
    });
  });

  describe('Get expenses for a specific user and page the results', () => {
    test('Expense route should return the first result when page is set to 1', async () => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful.

      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=1&limit=1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Cafe 22');
    });

    test('Expense route should return the second result when page is set to 2', async () => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=2&limit=1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Sliders');
    });

    test('Expense route should return the first result when page not set', async () => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Cafe 22');
    });

    test('Expense route should return the first result when page is set to 0', async () => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1&page=0');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Cafe 22');
    });

    test('Expense route should return the first result when page is set to a negative number', async () => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1&page=-1');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Cafe 22');
    });
  });

  describe('Get expenses for a specific user and filter the results', () => {
    test('Expense route should return a valid collection of expenses when filtered by merchant name', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filter[merchant_name]=Sliders');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Sliders');
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
    });

    test('Expense route should return a valid collection of expenses when filtered by multiple fields', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filter[merchant_name]=Donkey Republic&filter[status]=processed');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 1);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Donkey Republic');
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert(body[0].hasOwnProperty('currency'));
      assert(body[0].hasOwnProperty('status'));
      assert.equal(body[0].status, 'PROCESSED');
    });
  });

  describe('Get expenses for a specific user and sort the results', () => {
    test('Expense route should return a valid collection of expenses when filtered by merchant name ascending', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=merchant_name');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Cafe 22');

      assert(body[2].hasOwnProperty('merchant_name'));
      assert.equal(body[2].merchant_name, 'Sliders');
    });

    test('Expense route should return a valid collection of expenses when filtered by merchant name descending', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=-merchant_name');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
      assert(body[0].hasOwnProperty('merchant_name'));
      assert.equal(body[0].merchant_name, 'Sliders');

      assert(body[2].hasOwnProperty('merchant_name'));
      assert.equal(body[2].merchant_name, 'Cafe 22');
    });

    test('Expense route should return a valid collection of expenses when filtered by amount_in_cents and merchant_name', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=amount_in_cents,merchant_name');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert.equal(body[0].amount_in_cents, 6000);

      assert(body[2].hasOwnProperty('amount_in_cents'));
      assert.equal(body[2].amount_in_cents, 12000);
    });

    test('Expense route should return a valid collection of expenses when filtered by amount_in_cents descending and merchant_name', async () => {
      const res = await Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=-amount_in_cents,merchant_name');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.length, 3);
      assert(body[0].hasOwnProperty('amount_in_cents'));
      assert.equal(body[0].amount_in_cents, 12000);

      assert(body[2].hasOwnProperty('amount_in_cents'));
      assert.equal(body[2].amount_in_cents, 6000);
    });
  });
});
