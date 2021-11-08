declare module '*.tmLanguage.json' {
  const text: string;
  export default text;
}

declare module '*.wasm' {
  const getRaw: () => Promise<ArrayBuffer>;
  export default getRaw;
}

declare module 'string.prototype.trimend' {
  const trimEnd: (source: string) => string;
  export default trimEnd;
}

declare module 'vscode-oniguruma' {
  import * as m from 'vscode-oniguruma/main';

  export default m;
}

declare module 'vscode-textmate' {
  import * as m from 'vscode-textmate/release/main';

  export default m;
  export type {
    IGrammar,
    IOnigLib,
    IRawGrammar,
    Registry,
    OnigScanner,
    OnigString,
  } from 'vscode-textmate/release/main';
}
