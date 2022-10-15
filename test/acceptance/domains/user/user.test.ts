import { Api } from '../../utils/api';
import assert from 'assert';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaXNzIjoicGxlby5pbyIsImF1ZCI6ImFtYXppbmctYXBpLnBsZW8uaW8iLCJuYW1lIjoiQ2hyaXN0aWFuIEdpYWNvbWkiLCJpYXQiOjE1MTYyMzkwMjIsImVtYWlsIjoiY2hyaXN0aWFuZ2lhY29taUBnbWFpbC5jb20ifQ.moMmjupUFMVreBFuBAY3YEb1K7FbPtnaB4_oXtvqOOY';

describe('Authenticated user routes', () => {
  describe('Get specific user without auth token', () => {
    test('User route should return a 401', async () => {
      const res = await Api.get('/api/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
      assert.equal(res.statusCode, 401);
    });
  });
});

describe('Given an existing user in the database', () => {
  describe('Get specific user', () => {
    test('User route should return a valid user with a valid user id', async () => {
      const res = await Api.get('/api/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .set('Authorization', token);

      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert(body.data.hasOwnProperty('first_name'));
      assert(body.data.hasOwnProperty('last_name'));
      assert(body.data.hasOwnProperty('company_name'));
    });

    test('User route should return 404 with a non existing user id', async () => {
      const res = await Api.get('/api/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a471')
        .set('Authorization', token);

      assert.equal(res.statusCode, 404);
    });
  });

  describe('Get a user without an invalid userId in the request', () => {
    test('User route should return an error of type 400', async () => {
      const res = await Api.get('/api/v1/users/111')
        .set('Authorization', token);

      assert.equal(res.statusCode, 400);
    });
  });
});

describe('Given existing users in the database', () => {
  describe('Get all users', () => {
    test('User route should return a collection of users', async () => {
      const res = await Api.get('/api/v1/users')
        .set('Authorization', token);

      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert.equal(body.data.length, 3);
    });
  });
});
