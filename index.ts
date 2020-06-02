import { IGrammar, INITIAL, IOnigLib, IRawGrammar, Registry, parseRawGrammar } from 'vscode-textmate';
import { OnigScanner, OnigString, loadWASM } from 'vscode-oniguruma';
import { getLang, loadGrammarFile } from './gen/imports';

import trimEnd from 'string.prototype.trimend';

const loadGrammar = async (scopeName: string): Promise<IRawGrammar | null> => {
  const content = await loadGrammarFile(scopeName);
  if (!content) return null;

  return parseRawGrammar(content, `${scopeName}.tmLanguage.json`);
};

let onigLib: Promise<IOnigLib> | null = null;

const loadOnigLib = () => {
  if (onigLib !== null) return onigLib;
  return (onigLib = (async () => {
    const { default: wasmRaw } = await import('vscode-oniguruma/release/onig.wasm');

    try {
      await loadWASM(wasmRaw());
    } catch (e) {}

    return {
      createOnigScanner: (sources) => new OnigScanner(sources),
      createOnigString: (str) => new OnigString(str),
    } as IOnigLib;
  })());
};

let registry: Registry | null = null;

const getRegistry = () => {
  if (registry !== null) return registry;
  return (registry = new Registry({
    onigLib: loadOnigLib(),
    loadGrammar: loadGrammar,
  }));
};

const lines = (content: string): readonly string[] => {
  return content.split('\n').map((l) => trimEnd(l));
};

export type StartEvent = { readonly type: 'start'; readonly scope: string };
export type EndEvent = { readonly type: 'end'; readonly scope: string };
export type TokenEvent = { readonly type: 'token'; readonly scopes: readonly string[]; readonly text: string };
export type LineEvent = { readonly type: 'line' };
export type Event = StartEvent | EndEvent | TokenEvent | LineEvent;

function* tokenizeInner(source: string, grammar: IGrammar): Generator<Event> {
  let ruleStack = INITIAL;
  const scopeStack = [];

  for (const line of lines(source)) {
    const { tokens, ruleStack: nextRuleStack } = grammar.tokenizeLine(line, ruleStack);
    for (const token of tokens) {
      while (
        scopeStack.length > token.scopes.length ||
        scopeStack[scopeStack.length - 1] !== token.scopes[scopeStack.length - 1]
      ) {
        const scope = scopeStack.pop()!;
        yield { type: 'end', scope };
      }

      for (const scope of token.scopes.slice(scopeStack.length)) {
        yield { type: 'start', scope };
        scopeStack.push(scope);
      }

      const text = line.substring(token.startIndex, token.endIndex);
      yield { type: 'token', text, scopes: token.scopes };
    }

    ruleStack = nextRuleStack;
    yield { type: 'line' };
  }

  while (scopeStack.length > 0) {
    const scope = scopeStack.pop()!;
    yield { type: 'end', scope };
  }
}

export const tokenize = async (source: string, lang: string): Promise<Iterable<Event> | null> => {
  const scopeName = getLang(lang);
  if (!scopeName) return null;

  const grammar = await getRegistry().loadGrammar(scopeName);
  if (!grammar) return null;

  return tokenizeInner(source, grammar);
};
