import { HELPERS_ID, getHelpersModule } from './wasm/helper';

import { createHash } from 'crypto';
import fs from 'fs';

export const wasm = (options) => {
  const { maxFileSize = 14 * 1024, publicPath = '' } = options;

  const copies = Object.create(null);

  return {
    name: 'wasm',

    resolveId(id) {
      if (id === HELPERS_ID) {
        return id;
      }

      return null;
    },

    load(id) {
      if (id === HELPERS_ID) {
        return getHelpersModule();
      }

      if (!/\.wasm$/.test(id)) {
        return null;
      }

      return Promise.all([fs.promises.stat(id), fs.promises.readFile(id)]).then(([stats, buffer]) => {
        if ((maxFileSize && stats.size > maxFileSize) || maxFileSize === 0) {
          const hash = createHash('sha1').update(buffer).digest('hex').substr(0, 16);

          const filename = `${hash}.wasm`;
          const publicFilepath = `${publicPath}${filename}`;

          copies[id] = {
            filename,
            publicFilepath,
            buffer,
          };
        }

        return buffer.toString('binary');
      });
    },

    transform(code, id) {
      if (code && /\.wasm$/.test(id)) {
        const publicFilepath = copies[id] ? `'${copies[id].publicFilepath}'` : null;
        let src;

        if (publicFilepath === null) {
          src = Buffer.from(code, 'binary').toString('base64');
          src = `'${src}'`;
        } else {
          src = null;
        }

        return {
          map: {
            mappings: '',
          },
          code: `import { _loadWasmModule } from ${JSON.stringify(HELPERS_ID)};
export default (imports) => { return _loadWasmModule(${publicFilepath}, ${src}, imports); };`,
        };
      }
      return null;
    },

    generateBundle: async function write() {
      await Promise.all(
        Object.keys(copies).map(async (name) => {
          const copy = copies[name];

          this.emitFile({
            type: 'asset',
            source: copy.buffer,
            name: 'Rollup WASM Asset',
            fileName: copy.filename,
          });
        }),
      );
    },
  };
};
