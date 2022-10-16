import { Api } from '../../utils/api';
import assert from 'assert';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYTE0MGEyOS1hZTgwLTRmMGUtYTYyZC02YzJkMmJjOGE0NzQiLCJpc3MiOiJwbGVvLmlvIiwiYXVkIjoiYW1hemluZy1hcGkucGxlby5pbyIsIm5hbWUiOiJDaHJpc3RpYW4gR2lhY29taSIsImlhdCI6MTUxNjIzOTAyMiwiZW1haWwiOiJjaHJpc3RpYW5naWFjb21pQGdtYWlsLmNvbSJ9.VcrTQiT8GwmJj0EL0I1mP9q75DtH3BfAOCh_E4v5HPI';

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
    test('User route should return a valid user object for the authenticated user', async () => {
      const res = await Api.get('/api/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .set('Authorization', token);

      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');

      const { body } = res;
      assert(body.data.hasOwnProperty('first_name'));
      assert(body.data.hasOwnProperty('last_name'));
      assert(body.data.hasOwnProperty('company_name'));
    });
  });

  describe('Get a user without an invalid userId in the request', () => {
    test('User route should return a bad request error because the userId in the route does not match the authenticated userId', async () => {
      const res = await Api.get('/api/v1/users/111')
        .set('Authorization', token);

      assert.equal(res.statusCode, 400);
    });
  });
});
