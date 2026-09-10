#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const promptsDir = path.join(rootDir, 'prompts');
const manifest = JSON.parse(fs.readFileSync(path.join(promptsDir, 'manifest.json'), 'utf8'));

function findPrompt(id) {
  return manifest.find((p) => p.id === id);
}

function printList() {
  console.log('Prompts disponíveis:\n');
  for (const p of manifest) {
    console.log(`  ${p.id.padEnd(22)} ${p.title}`);
    console.log(`  ${''.padEnd(22)} ${p.description}\n`);
  }
  console.log('Uso: npx @unificando/prompts get <id> [--copy]');
}

function copyToClipboard(text) {
  const platform = process.platform;
  let cmd;
  let args;
  if (platform === 'darwin') {
    cmd = 'pbcopy';
    args = [];
  } else if (platform === 'win32') {
    cmd = 'clip';
    args = [];
  } else {
    cmd = 'xclip';
    args = ['-selection', 'clipboard'];
  }
  const result = spawnSync(cmd, args, { input: text });
  if (result.error) {
    console.error(`Não foi possível copiar para a área de transferência (${cmd} indisponível). Copie manualmente a partir da saída acima.`);
    return false;
  }
  return true;
}

function printGet(id, { copy }) {
  const prompt = findPrompt(id);
  if (!prompt) {
    console.error(`Prompt "${id}" não encontrado. Rode "npx @unificando/prompts list" para ver os disponíveis.`);
    process.exitCode = 1;
    return;
  }
  const content = fs.readFileSync(path.join(promptsDir, prompt.file), 'utf8');
  if (copy) {
    const ok = copyToClipboard(content);
    if (ok) {
      console.log(`Prompt "${prompt.title}" copiado para a área de transferência.`);
      return;
    }
  }
  console.log(content);
}

function main() {
  const [, , command, ...rest] = process.argv;

  if (!command || command === '--help' || command === '-h') {
    printList();
    return;
  }

  if (command === 'list') {
    printList();
    return;
  }

  if (command === 'get') {
    const id = rest.find((a) => !a.startsWith('--'));
    const copy = rest.includes('--copy');
    if (!id) {
      console.error('Uso: npx @unificando/prompts get <id> [--copy]');
      process.exitCode = 1;
      return;
    }
    printGet(id, { copy });
    return;
  }

  console.error(`Comando desconhecido: ${command}`);
  printList();
  process.exitCode = 1;
}

main();
