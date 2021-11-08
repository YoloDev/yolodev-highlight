import resolve from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import ts from 'rollup-plugin-ts';
import { wasm } from './build/wasm';

export default {
  input: './index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
    },
  ],

  external: ['string.prototype.trimend', 'vscode-oniguruma', 'vscode-textmate'],

  plugins: [
    resolve(),
    wasm({ maxFileSize: 0 }),
    string({
      include: 'grammars/**/*.tmLanguage.json',
    }),
    ts(/*{ plugin options }*/),
  ],
};
