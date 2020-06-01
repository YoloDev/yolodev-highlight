declare module '*.tmLanguage.json' {
  const text: string;
  export = text;
}

declare module '*.wasm' {
  const getRaw: () => ArrayBuffer;
  export = getRaw;
}

declare module 'string.prototype.trimend' {
  const trimEnd: (source: string) => string;
  export = trimEnd;
}
