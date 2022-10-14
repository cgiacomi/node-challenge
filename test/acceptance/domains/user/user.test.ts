import { Api } from '../../utils/api';
import assert from 'assert';

describe('Given an existing user in the database', () => {
  describe('Get specific user', () => {
    test('User route should return a valid user with a valid user id', async () => {
      const res = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert(body.hasOwnProperty('first_name'));
      assert(body.hasOwnProperty('last_name'));
      assert(body.hasOwnProperty('company_name'));
    });

    test('User route should return 404 with a non existing user id', async () => {
      const res = await Api.get('/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a471');
      assert.equal(res.statusCode, 404);
    });
  });

  describe('Get a user without an invalid userId in the request', () => {
    test('User route should return an error of type 400', async () => {
      const res = await Api.get('/user/v1/get-user-details?userId=111');
      assert.equal(res.statusCode, 400);
    });
  });

  describe('Get a user without userId in the request', () => {
    test('User route should return an error of type 400', async () => {
      const res = await Api.get('/user/v1/get-user-details');
      assert.equal(res.statusCode, 400);
    });
  });
});
