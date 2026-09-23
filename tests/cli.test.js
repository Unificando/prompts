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

test('get compõe contrato e somente o módulo solicitado', () => {
  const result = runCli(['get', 'frontend', '--module', 'performance', '--mode', 'auditoria', '--scope', 'src/Cart.tsx']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Contrato comum/);
  assert.match(result.stdout, /Modo selecionado: AUDITORIA/);
  assert.match(result.stdout, /src\/Cart\.tsx/);
  assert.match(result.stdout, /## Módulo: performance/);
  assert.doesNotMatch(result.stdout, /## Módulo: limpeza/);
  assert.doesNotMatch(result.stdout, /\{\{CONTRACT\}\}|\{\{MODULES\}\}/);
});

test('get sem seleção inclui todos os módulos do frontend', () => {
  const result = runCli(['get', 'frontend']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /## Módulo: limpeza/);
  assert.match(result.stdout, /## Módulo: performance/);
});

test('inspect entrega metadados e identidade reproduzível', () => {
  const result = runCli(['inspect', 'frontend']);
  assert.equal(result.status, 0, result.stderr);
  const info = JSON.parse(result.stdout);
  assert.match(info.version, /^\d+\.\d+\.\d+$/);
  assert.match(info.sha256, /^[a-f0-9]{64}$/);
  assert.ok(info.modules.some(m => m.id === 'performance'));
  assert.ok(info.inputs.length && info.outputs.length);
});

for (const args of [
  ['get', 'frontend', '--module', 'inexistente'],
  ['get', 'seo', '--module', 'performance'],
  ['get', 'frontend', '--mode', 'talvez'],
  ['get', 'auditoria-seguranca', '--mode', 'implementacao'],
  ['get', 'frontend', '--scope'],
  ['get', 'frontend', '--mode', '--copy'],
  ['get', 'frontend', '--unknown'],
  ['get', 'frontend', 'backend'],
  ['get', 'frontend', '--module', 'performance,'],
  ['get', 'frontend', '--mode', 'auditoria', '--mode', 'proposta'],
]) {
  test(`argumentos inválidos não produzem prompt: ${args.join(' ')}`, () => {
    const result = runCli(args);
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.ok(result.stderr.trim());
  });
}

test('todos os prompts têm contrato expandido e modo explícito', () => {
  for (const prompt of manifest) {
    const result = runCli(['get', prompt.id]);
    assert.equal(result.status, 0, `${prompt.id}: ${result.stderr}`);
    assert.match(result.stdout, /Contrato comum/);
    assert.match(result.stdout, /Modo selecionado:/);
    assert.doesNotMatch(result.stdout, /10\/10|\{\{CONTRACT\}\}|\{\{MODULES\}\}/);
  }
});

test('falha de clipboard com saída não zero oferece conteúdo para cópia manual', { skip: process.platform === 'win32' }, () => {
  const fs = require('node:fs');
  const os = require('node:os');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-clipboard-'));
  try {
    const executable = path.join(temp, process.platform === 'darwin' ? 'pbcopy' : 'xclip');
    fs.writeFileSync(executable, '#!/bin/sh\nexit 7\n', { mode: 0o755 });
    const result = spawnSync(process.execPath, [cliPath, 'get', 'seo', '--copy'], {
      encoding: 'utf8', env: { ...process.env, PATH: temp + path.delimiter + process.env.PATH },
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stderr, /Não foi possível copiar/);
    assert.match(result.stdout, /Contrato comum/);
    assert.doesNotMatch(result.stdout, /copiado para a área de transferência/);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});

test('documentacao está disponível com contrato e escopo de documento único', () => {
  const result = runCli(['get', 'documentacao', '--mode', 'proposta', '--scope', 'documento:API.md']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Modo selecionado: PROPOSTA/);
  assert.match(result.stdout, /documento:API\.md/);
  assert.match(result.stdout, /Contrato comum/);
  for (const file of ['API.md', 'ARCHITECTURE.md', 'BUSINESS_RULES.md', 'CRON.md', 'DATABASE.md', 'DEPLOYMENT.md', 'DESIGN_SYSTEM.md', 'DEVELOPMENT.md', 'MCP.md', 'SECURITY.md', 'USER_STORIES.md']) {
    assert.ok(result.stdout.includes(file), `Documento não contemplado: ${file}`);
  }
  const info = runCli(['inspect', 'documentacao']);
  assert.equal(info.status, 0, info.stderr);
  assert.equal(JSON.parse(info.stdout).defaultMode, 'implementacao');
});
