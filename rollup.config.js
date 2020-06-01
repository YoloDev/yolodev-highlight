import { readFile } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import typescript from 'rollup-plugin-typescript2';

const inlineWasm = () => {
  return {
    name: 'inlineWasm',
    load(id) {
      if (/\.wasm$/.test(id)) {
        return new Promise((res, reject) => {
          readFile(id, (error, buffer) => {
            if (error != null) {
              reject(error);
            }
            res(buffer.toString('binary'));
          });
        });
      }
      return null;
    },

    banner: `
    function _loadWasmBinary (src, imports) {
      var buf = null
      var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null
      if (isNode) {
        buf = Buffer.from(src, 'base64').buffer
      } else {
        var raw = globalThis.atob(src)
        var rawLength = raw.length
        buf = new Uint8Array(new ArrayBuffer(rawLength))
        for(var i = 0; i < rawLength; i++) {
           buf[i] = raw.charCodeAt(i)
        }
      }
      return buf;
    }
    `,

    transform(code, id) {
      if (code && /\.wasm$/.test(id)) {
        const src = Buffer.from(code, 'binary').toString('base64');
        return `export default function(imports){return _loadWasmBinary('${src}', imports)}`;
      }
      return null;
    },
  };
};

export default {
  input: './index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    {
      dir: 'dist/esm',
      format: 'esm',
    },
  ],

  external: ['string.prototype.trimend', 'vscode-oniguruma', 'vscode-textmate'],

  plugins: [
    resolve(),
    inlineWasm(),
    string({
      include: 'grammars/**/*.tmLanguage.json',
    }),
    typescript(/*{ plugin options }*/),
  ],
};
