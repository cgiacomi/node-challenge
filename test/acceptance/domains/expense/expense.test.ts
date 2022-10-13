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

  describe('Get expenses for a specific user and limit the results', () => {
    test('Expense route should return 1 result when limit is set to 1', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 1);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert(res.body[0].hasOwnProperty('amount_in_cents'));
          assert(res.body[0].hasOwnProperty('currency'));
          assert(res.body[0].hasOwnProperty('status'));
        })
        .end(done);
    });

    test('Expense route should return 2 result when limit is set to 2', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=2')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 2);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert(res.body[0].hasOwnProperty('amount_in_cents'));
          assert(res.body[0].hasOwnProperty('currency'));
          assert(res.body[0].hasOwnProperty('status'));
        })
        .end(done);
    });

    test('Expense route should return 0 result when limit is set to 0', (done) => {
      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=0')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 0);
        })
        .end(done);
    });
  });

  describe('Get expenses for a specific user and page the results', () => {
    test('Expense route should return the first result when page is set to 1', (done) => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful.

      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=1&limit=1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 1);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert.equal(res.body[0].merchant_name, 'Sliders');
        })
        .end(done);
    });

    test('Expense route should return the second result when page is set to 2', (done) => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=2&limit=1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 1);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert.equal(res.body[0].merchant_name, 'Cafe 22');
        })
        .end(done);
    });

    test('Expense route should return the first result when page not set', (done) => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 1);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert.equal(res.body[0].merchant_name, 'Sliders');
        })
        .end(done);
    });

    test('Expense route should return the first result when page is set to 0', (done) => {
      // CHRIS: This test is a bit contrived, because I am not actively populating the DB in the test.
      // Ideally one would first seed the DB with a set of records that can be validated in the test.
      // for this part of the challenge I will assume that the file dump.sql is used for testing purposes.
      // I will try to expand the test once I have completed the other parts so that the test is more
      // meaningful. (sorry for repeating this note.)

      Api.get('/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&limit=1&page=0')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.equal(res.body.length, 1);
          assert(res.body[0].hasOwnProperty('merchant_name'));
          assert.equal(res.body[0].merchant_name, 'Sliders');
        })
        .end(done);
    });
  });
});
