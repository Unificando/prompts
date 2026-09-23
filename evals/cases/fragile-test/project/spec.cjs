const test = require('node:test');
const assert = require('node:assert/strict');
const { sortNames } = require('./names.cjs');
test('usa algoritmo anterior', () => {
  assert.match(sortNames.toString(), /bubbleSort/);
});
