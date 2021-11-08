import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const HELPERS_ID = '\0wasmHelpers.js';

export const getHelpersModule = () => {
  const helper = path.resolve(__dirname, '_helper.js');
  const content = fs.readFileSync(helper, { encoding: 'utf-8' });
  return content;
};
