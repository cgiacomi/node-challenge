import { Api } from '../../utils/api';
import assert from 'assert';

describe('Given an existing user in the database', () => {
  describe('Get specific user', () => {
    test('User route should return a valid user with a valid user id', (done) => {
      Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert(res.body.hasOwnProperty('first_name'));
          assert(res.body.hasOwnProperty('last_name'));
          assert(res.body.hasOwnProperty('company_name'));
        })
        .end(done);
    });

    test('User route should return 404 with a non existing user id', (done) => {
      Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a471')
        .expect(404, done);
    });
  });

  describe('Get a user without an invalid userId in the request', () => {
    test('User route should return an error of type 400', (done) => {
      Api.get('/user/v1/get-user-details?userId=111')
        .expect(400, done);
    });
  });

  describe('Get a user without userId in the request', () => {
    test('User route should return an error of type 400', (done) => {
      Api.get('/user/v1/get-user-details')
        .expect(400, done);
    });
  });
});
