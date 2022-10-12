import { upper } from '../capitalize';

describe('[Packages | User-domain | Formatter] capitalize', () => {
  test('capitalize should make the first character as a capital letter', () => {
    return expect(upper('chris')).toEqual('CHRIS');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(upper('CHRIS')).toEqual('CHRIS');
  });

  test('capitalize should do notthing if the word is null or empty', () => {
    return expect(upper('')).toEqual('');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(upper('42')).toEqual('42');
  });
});
