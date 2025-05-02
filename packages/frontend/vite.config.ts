import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as node_fs from 'fs';

function get_paths_from_tsconfig() {
  const tsconfig_s = node_fs
    .readFileSync('./tsconfig.dev.json', 'utf-8')
    .replace(/\/\/.*$/gm, ''); // Removing comments
  const tsconfig = JSON.parse(tsconfig_s);
  const aliases: Record<string, string> = {};
  const paths: Record<string, string[]> = tsconfig.compilerOptions?.paths || {};
  for (const [key, val] of Object.entries(paths)) {
    const normalizedKey = key.replace(/\/\*$/, '');
    const normalizedVal = val[0].replace(/\/\*$/, '');
    aliases[normalizedKey] = path.resolve(__dirname, normalizedVal);
  }
  return aliases;
}

export default defineConfig(({ command }) => ({
  plugins: [react()],
  define: {
    __BACKEND_API_URL__: JSON.stringify(process.env.VITE_BACKEND_API_URL),
  },
  resolve: {
    alias: get_paths_from_tsconfig(),
  },
  server: {
    host: true,
    port: 3000,
    hmr:
      command === 'serve'
        ? {
            protocol: 'ws',
            host: undefined, // ❗ allow Vite to infer from window.location.hostname
            port: 3000,
          }
        : undefined,
  },
}));
