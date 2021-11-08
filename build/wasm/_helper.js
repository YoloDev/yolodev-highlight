const loadWasmModuleNode = async (filepath, imports) => {
  const fs = await import('fs');
  const path = await import('path');
  const url = await import('url');
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

  const resolvedFilepath = path.resolve(__dirname, filepath);
  const buffer = await fs.promises.readFile(resolvedFilepath);
  return buffer.buffer;
};

const loadWasmModuleWeb = async (filepath, imports) => {
  const fetchPromise = await fetch(filepath);
  const buffer = await fetchPromise.arrayBuffer();
  return buffer;
};

export const _loadWasmModule = (filepath, src, imports) => {
  const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
  if (filepath && isNode) {
    return loadWasmModuleNode(filepath, imports);
  } else if (filepath) {
    return loadWasmModuleWeb(filepath, imports);
  }

  let buf = null;
  if (isNode) {
    buf = Buffer.from(src, 'base64');
  } else {
    const raw = globalThis.atob(src);
    const rawLength = raw.length;
    buf = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      buf[i] = raw.charCodeAt(i);
    }
  }

  return buf.buffer;
};
