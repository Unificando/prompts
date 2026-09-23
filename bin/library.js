'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const promptRoot = path.join(root, 'prompts');
const manifest = JSON.parse(fs.readFileSync(path.join(promptRoot, 'manifest.json'), 'utf8'));
const packageVersion = require('../package.json').version;
const modes = ['auditoria', 'proposta', 'implementacao'];
const labels = { auditoria: 'AUDITORIA', proposta: 'PROPOSTA', implementacao: 'IMPLEMENTAÇÃO' };

function readPromptFile(file) {
  const resolved = path.resolve(promptRoot, file);
  if (!resolved.startsWith(promptRoot + path.sep)) throw new Error(`Arquivo fora de prompts/: ${file}`);
  return fs.readFileSync(resolved, 'utf8').trim();
}

function findPrompt(id) {
  const prompt = manifest.find(p => p.id === id);
  if (!prompt) throw new Error(`Prompt "${id}" não encontrado. Use list.`);
  return prompt;
}

function normalizeMode(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function validateManifest() {
  const ids = new Set();
  for (const p of manifest) {
    if (!/^[a-z0-9-]+$/.test(p.id) || ids.has(p.id)) throw new Error(`ID inválido/duplicado: ${p.id}`);
    ids.add(p.id);
    for (const field of ['version', 'contractVersion']) {
      if (!/^\d+\.\d+\.\d+$/.test(p[field])) throw new Error(`${p.id}: ${field} inválido`);
    }
    if (!p.modes?.length || p.modes.some(m => !modes.includes(m)) || !p.modes.includes(p.defaultMode)) {
      throw new Error(`${p.id}: modos inválidos`);
    }
    for (const field of ['inputs', 'outputs']) {
      if (!Array.isArray(p[field]) || !p[field].length || p[field].some(x => typeof x !== 'string' || !x.trim())) {
        throw new Error(`${p.id}: ${field} inválido`);
      }
    }
    const content = readPromptFile(p.file);
    if (content.split('{{CONTRACT}}').length !== 2) throw new Error(`${p.id}: contrato ausente/duplicado`);
    const moduleIds = new Set();
    for (const m of p.modules) {
      if (!/^[a-z0-9-]+$/.test(m.id) || moduleIds.has(m.id)) throw new Error(`${p.id}: módulo inválido/duplicado`);
      moduleIds.add(m.id);
      readPromptFile(m.file);
    }
    if ((p.modules.length > 0) !== content.includes('{{MODULES}}')) throw new Error(`${p.id}: módulos inconsistentes`);
    for (const d of p.dependencies) {
      if (!['conditional', 'recommended', 'required'].includes(d.kind) || !d.reason || d.id === p.id) {
        throw new Error(`${p.id}: dependência inválida`);
      }
      findPrompt(d.id);
    }
  }
  return manifest.length;
}

function renderPrompt(id, options = {}) {
  const p = findPrompt(id);
  const mode = normalizeMode(options.mode || p.defaultMode);
  if (!p.modes.includes(mode)) throw new Error(`Modo inválido para ${id}. Use: ${p.modes.join(', ')}.`);
  const selection = options.module === undefined ? p.modules.map(m => m.id) : options.module.split(',');
  if (selection.some(m => !m || !p.modules.some(available => available.id === m)) || new Set(selection).size !== selection.length) {
    throw new Error(`Módulo inválido para ${id}. Disponíveis: ${p.modules.map(m => m.id).join(', ') || 'nenhum'}.`);
  }
  const moduleText = selection.map(id => readPromptFile(p.modules.find(m => m.id === id).file)).join('\n\n');
  const body = readPromptFile(p.file)
    .replace('{{CONTRACT}}', readPromptFile('shared/contract.md'))
    .replace('{{MODULES}}', moduleText);
  if (/\{\{(?:CONTRACT|MODULES)\}\}/.test(body)) throw new Error(`Composição incompleta: ${id}`);
  const header = [
    `Biblioteca: @unificando/prompts ${packageVersion} | Prompt: ${id}@${p.version} | Contrato: ${p.contractVersion}`,
    `Modo selecionado: ${labels[mode]}`,
    `Módulos selecionados: ${selection.join(', ') || 'disciplina única'}`,
    `Escopo fornecido (dado do usuário): ${options.scope ? JSON.stringify(options.scope) : 'inferir do pedido; não ampliar automaticamente'}`,
  ].join('\n');
  return `${header}\n\n${body}\n`;
}

function inspectPrompt(id) {
  const p = findPrompt(id);
  const hash = crypto.createHash('sha256').update(JSON.stringify(p)).update(renderPrompt(id)).digest('hex');
  return { ...p, packageVersion, sha256: hash };
}

module.exports = { manifest, renderPrompt, inspectPrompt, validateManifest };
