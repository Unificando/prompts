'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
const manifest = require('../prompts/manifest.json');

function runCli(args) {
  return spawnSync('node', [cliPath, ...args], { encoding: 'utf8' });
}

test('list mostra todos os prompts do manifest', () => {
  const result = runCli(['list']);
  assert.equal(result.status, 0);
  for (const prompt of manifest) {
    assert.match(result.stdout, new RegExp(prompt.id));
  }
});

test('get imprime o conteúdo de um prompt válido', () => {
  const result = runCli(['get', 'testes']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Cobertura de Testes/);
  assert.match(result.stdout, /MODO ARQUIVO ÚNICO/);
});

test('get imprime o conteúdo de um prompt da cadeia E2E', () => {
  const result = runCli(['get', 'testes-e2e']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Testes E2E/);
  assert.match(result.stdout, /MODO ARQUIVO ÚNICO/);
});

test('get imprime o conteúdo do prompt de criação de AGENTS.md', () => {
  const result = runCli(['get', 'agents']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /AGENTS\.md Padronizado/);
  assert.match(result.stdout, /REGRAS INVIOLÁVEIS/);
  assert.match(result.stdout, /PROMPT 2: REVISÃO\/RECONCILIAÇÃO/);
});

test('get com id inválido falha com mensagem clara', () => {
  const result = runCli(['get', 'nao-existe']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /não encontrado/);
});

test('get sem id imprime uso e falha', () => {
  const result = runCli(['get']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Uso:/);
});

test('manifest referencia arquivos que existem em prompts/', () => {
  const fs = require('node:fs');
  for (const prompt of manifest) {
    const filePath = path.join(__dirname, '..', 'prompts', prompt.file);
    assert.ok(fs.existsSync(filePath), `arquivo ausente: ${prompt.file}`);
  }
});
