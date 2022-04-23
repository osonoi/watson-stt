// sum.test.js
const sum = require('./sum');

test('adds 2 + 2 to equal 3', () => {
  expect(sum(2, 2)).toBe(3);
});