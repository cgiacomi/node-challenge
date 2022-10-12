import { Api } from '../../utils/api';
import assert from 'assert';

describe('Given existing expenses for a user in the database', () => {
  describe('Get expenses for a specific user', () => {
    test('Expense route should return a valid collection of expenses with a valid user id', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 3);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert(res.body[0].hasOwnProperty('amount_in_cents'));
          assert(res.body[0].hasOwnProperty('currency'));
          assert(res.body[0].hasOwnProperty('status'));
        })
        .end(done);
    });

    test('Expense route should return an empty collection with a non existing user id', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a471')
        .expect(200)
        .expect((res) => {
          assert.equal(res.body.length, 0);
        })
        .end(done);
    });
  });

  describe('Get expenses for an invalid userId in the request', () => {
    test('Expense route should return an error of type 400', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=111')
        .expect(400, done);
    });
  });
});
