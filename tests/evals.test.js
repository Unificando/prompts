'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const cases = require('../evals/cases.json');
const cli = path.join(__dirname, '../bin/evals.js');
function run(...args) { return spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' }); }

test('avaliação lista cenários e monta prompt sem gabarito', () => {
  const list = run('list');
  assert.equal(list.status, 0, list.stderr);
  for (const c of cases) assert.ok(list.stdout.includes(c.id));
  const show = run('show', 'public-route');
  assert.equal(show.status, 0, show.stderr);
  assert.match(show.stdout, /Contrato comum/);
  assert.match(show.stdout, /Revise código morto/);
  assert.doesNotMatch(show.stdout, /preserve-route/);
});

test('template não inventa avaliação de modelo', () => {
  const r = run('template');
  assert.equal(r.status, 0, r.stderr);
  const report = JSON.parse(r.stdout);
  assert.equal(report.runs.length, cases.length);
  for (const entry of report.runs) {
    assert.equal(entry.status, 'not_run');
    for (const assessment of entry.assessments) assert.equal(assessment.verdict, 'not_assessed');
  }
});

test('check distingue incompleto, aprovado, falho e evidência ausente', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-evals-'));
  try {
    const template = run('template');
    assert.equal(template.status, 0, template.stderr);
    const report = JSON.parse(template.stdout);
    const file = path.join(temp, 'results.json');
    const check = () => { fs.writeFileSync(file, JSON.stringify(report)); return run('check', file); };
    assert.equal(check().status, 2);
    fs.writeFileSync(path.join(temp, 'transcript.md'), 'Resposta e diff sintéticos usados SOMENTE no teste do validador.');
    for (const entry of report.runs) {
      entry.status = 'reviewed'; entry.model = 'test-only'; entry.reviewer = 'test-only';
      entry.executedAt = '2026-09-22T12:00:00Z'; entry.artifact = 'transcript.md';
      for (const a of entry.assessments) { a.verdict = 'pass'; a.evidence = 'Trecho sintético: resposta e diff.'; }
    }
    assert.equal(check().status, 0);
    report.runs[0].assessments[0].verdict = 'fail';
    assert.equal(check().status, 1);
    report.runs[0].assessments[0].verdict = 'pass';
    report.runs[0].assessments[0].evidence = '';
    assert.equal(check().status, 1);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});

test('check rejeita relatório vazio, duplicado ou sem metadados', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-evals-'));
  try {
    const file = path.join(temp, 'bad.json');
    for (const value of [{}, { runs: [] }, { runs: [{ id: cases[0].id }, { id: cases[0].id }] }]) {
      fs.writeFileSync(file, JSON.stringify(value));
      assert.equal(run('check', file).status, 1);
    }
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});

test('check rejeita resultados vencidos e critérios duplicados', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-evals-'));
  try {
    const r = run('template');
    assert.equal(r.status, 0, r.stderr);
    const file = path.join(temp, 'results.json');
    const stale = JSON.parse(r.stdout);
    stale.runs[0].caseHash = '0'.repeat(64);
    fs.writeFileSync(file, JSON.stringify(stale));
    const result = run('check', file);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /desatualizado/);
    const duplicate = JSON.parse(r.stdout);
    duplicate.runs[0].assessments[1] = duplicate.runs[0].assessments[0];
    fs.writeFileSync(file, JSON.stringify(duplicate));
    assert.match(run('check', file).stderr, /duplicado/);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
