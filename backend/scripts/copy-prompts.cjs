const { cpSync, mkdirSync } = require('node:fs');
const { resolve } = require('node:path');

const src = resolve(__dirname, '..', 'src', 'ai', 'prompts');
const dest = resolve(__dirname, '..', 'dist', 'ai', 'prompts');

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
