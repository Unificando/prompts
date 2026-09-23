'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { manifest, renderPrompt, inspectPrompt, validateManifest } = require('../bin/library');

test('catálogo valida versões, dependências e fontes', () => {
  assert.equal(validateManifest(), manifest.length);
  assert.equal(new Set(manifest.map(p => p.id)).size, manifest.length);
});

test('todos os modos declarados produzem contrato autossuficiente', () => {
  for (const p of manifest) {
    for (const mode of p.modes) {
      const text = renderPrompt(p.id, { mode });
      assert.equal((text.match(/## Contrato comum/g) || []).length, 1, p.id);
      assert.doesNotMatch(text, /\{\{CONTRACT\}\}|\{\{MODULES\}\}/);
      assert.match(text, /Observação:|Observação →/);
    }
  }
});

test('seleção de vários módulos mantém ordem e rejeita duplicados', () => {
  const text = renderPrompt('backend', { module: 'banco,performance' });
  assert.ok(text.indexOf('## Módulo: banco') < text.indexOf('## Módulo: performance'));
  assert.doesNotMatch(text, /## Módulo: seguranca/);
  assert.throws(() => renderPrompt('backend', { module: 'banco,banco' }), /Módulo inválido/);
});

test('modo aceita português com acento e escopo é dado delimitado', () => {
  const text = renderPrompt('frontend', { mode: 'IMPLEMENTAÇÃO', module: 'erros', scope: 'src/Meu arquivo.tsx\ntexto adicional' });
  assert.match(text, /Modo selecionado: IMPLEMENTAÇÃO/);
  assert.ok(text.includes(JSON.stringify('src/Meu arquivo.tsx\ntexto adicional')));
});

test('hash de identidade é estável e todas as fontes Markdown locais existem', () => {
  for (const p of manifest) {
    assert.equal(inspectPrompt(p.id).sha256, inspectPrompt(p.id).sha256);
    for (const file of [p.file, ...p.modules.map(m => m.file)]) {
      const absolute = path.join(__dirname, '../prompts', file);
      const content = fs.readFileSync(absolute, 'utf8');
      for (const match of content.matchAll(/\]\(([^)]+\.md)\)/g)) {
        if (/^https?:/.test(match[1])) continue;
        assert.ok(fs.existsSync(path.resolve(path.dirname(absolute), match[1])), `${file}: ${match[1]}`);
      }
      assert.equal((content.match(/^```/gm) || []).length % 2, 0, `Bloco aberto: ${file}`);
      assert.doesNotMatch(content, /10\/10|PARADA AQUI|aguarde confirmação antes de gerar o patch/);
    }
  }
});

test('frontend mantém acessibilidade sem incluir checklist de SEO', () => {
  const selected = renderPrompt('frontend', { module: 'acessibilidade' });
  assert.match(selected, /## Módulo: acessibilidade/);
  assert.match(selected, /teclado/);
  const complete = renderPrompt('frontend');
  assert.doesNotMatch(complete, /acessibilidade-seo|canonical|robots|sitemap|seo-llm/i);
  assert.throws(() => renderPrompt('frontend', { module: 'acessibilidade-seo' }), /Módulo inválido/);
  assert.match(renderPrompt('seo'), /canonical/);
});
