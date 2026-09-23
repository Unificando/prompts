'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.join(__dirname, '../evals/cases');

test('fixture pública serve rota direta sem link na home', () => {
  const { handler } = require(path.join(root, 'public-route/project/server.cjs'));
  function response(url) {
    const result = { status: 200, body: '' };
    handler({ url }, { writeHead(status) { result.status = status; }, end(body) { result.body = body; } });
    return result;
  }
  assert.equal(response('/shared').status, 200);
  assert.match(response('/shared').body, /compartilhável/);
  assert.doesNotMatch(response('/').body, /href/);
  assert.equal(response('/missing').status, 404);
});

test('fixture de teste frágil tem implementação correta e teste interno falhando', () => {
  const directory = path.join(root, 'fragile-test/project');
  const { sortNames } = require(path.join(directory, 'names.cjs'));
  const input = ['B', 'A'];
  assert.deepEqual(sortNames(input), ['A', 'B']);
  assert.deepEqual(input, ['B', 'A']);
  // Launch a separate test runner instead of inheriting the parent's worker context.
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(process.execPath, ['--test', 'spec.cjs'], { cwd: directory, encoding: 'utf8', env });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /bubbleSort/);
});

test('fixture de frete contém o bug de limite e mantém API pública', () => {
  const { shipping, quoteForPartner } = require(path.join(root, 'bug-and-false-positive/project/shipping.cjs'));
  assert.equal(shipping(99), 10);
  assert.equal(shipping(100), 10, 'Defeito intencional: contrato requer zero aqui.');
  assert.equal(shipping(101), 0);
  assert.equal(typeof quoteForPartner, 'function');
});

test('fixture de retomada contém perda real do filtro de tenant', () => {
  const { findRecord } = require(path.join(root, 'stale-pipeline/project/record.cjs'));
  const record = { id: 1, tenantId: 'other' };
  assert.equal(findRecord({ records: [record] }, 1, 'mine'), record, 'Defeito intencional para revalidação.');
});
