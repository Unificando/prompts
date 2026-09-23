#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');
const { manifest, renderPrompt, inspectPrompt, validateManifest } = require('./library');

const usage = 'Uso: npx @unificando/prompts get <id> [--mode auditoria|proposta|implementacao] [--module id,id] [--scope "alvo"] [--copy]';

function list() {
  console.log('Prompts disponíveis:\n');
  for (const p of manifest) {
    console.log(`  ${p.id.padEnd(22)} ${p.title} (${p.version}; padrão: ${p.defaultMode})\n                         ${p.description}`);
    if (p.modules.length) console.log(`                         Módulos: ${p.modules.map(m => m.id).join(', ')}`);
  }
  console.log(`\n${usage}\nOutros comandos: list | inspect <id> | validate`);
}

function parseGet(args) {
  const options = {};
  let id;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--copy') {
      if (options.copy) throw new Error('Opção repetida: --copy');
      options.copy = true;
    } else if (['--mode', '--module', '--scope'].includes(arg)) {
      const key = arg.slice(2);
      if (options[key] !== undefined) throw new Error(`Opção repetida: ${arg}`);
      const value = args[++i];
      if (!value?.trim() || value.startsWith('--')) throw new Error(`Valor ausente: ${arg}`);
      options[key] = value;
    } else if (arg.startsWith('-')) {
      throw new Error(`Opção desconhecida: ${arg}`);
    } else if (id) {
      throw new Error(`Argumento inesperado: ${arg}`);
    } else {
      id = arg;
    }
  }
  if (!id) throw new Error(usage);
  return { id, options };
}

function copyToClipboard(content) {
  const [cmd, args] = process.platform === 'darwin' ? ['pbcopy', []]
    : process.platform === 'win32' ? ['clip', []] : ['xclip', ['-selection', 'clipboard']];
  const result = spawnSync(cmd, args, { input: content, encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    console.error(`Não foi possível copiar (${cmd}). Conteúdo disponível na saída para cópia manual.`);
    return false;
  }
  return true;
}

function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || ['list', '--help', '-h'].includes(command)) {
    if (args.length) throw new Error('list/help não aceita argumentos.');
    list();
  } else if (command === 'get') {
    const { id, options } = parseGet(args);
    const content = renderPrompt(id, options);
    if (options.copy && copyToClipboard(content)) console.log(`Prompt "${id}" copiado para a área de transferência.`);
    else process.stdout.write(content);
  } else if (command === 'inspect') {
    if (args.length !== 1) throw new Error('Uso: inspect <id>');
    console.log(JSON.stringify(inspectPrompt(args[0]), null, 2));
  } else if (command === 'validate') {
    if (args.length) throw new Error('validate não aceita argumentos.');
    console.log(`${validateManifest()} prompts válidos.`);
  } else {
    throw new Error(`Comando desconhecido: ${command}`);
  }
}

try { main(); } catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
