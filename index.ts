import type { IGrammar, IOnigLib, IRawGrammar } from 'vscode-textmate';
import { getLang, loadGrammarFile } from './gen/imports';

import trimEnd from 'string.prototype.trimend';
import vscodeOniguruma from 'vscode-oniguruma';
import vscodeTextmate from 'vscode-textmate';

const { INITIAL, Registry, parseRawGrammar } = vscodeTextmate;
const { OnigScanner, OnigString, loadWASM } = vscodeOniguruma;

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

    const buffer = await wasmRaw();
    await loadWASM(buffer);

    const createOnigScanner = (sources: string[]) => new OnigScanner(sources) as import('vscode-textmate').OnigScanner;
    const createOnigString = (str: string) => new OnigString(str) as import('vscode-textmate').OnigString;

    return {
      createOnigScanner,
      createOnigString,
    } as IOnigLib;
  })());
};

let registry: import('vscode-textmate').Registry | null = null;

const getRegistry = async () => {
  if (registry !== null) return registry;
  const onigLib = await loadOnigLib();
  return (registry = new Registry({
    onigLib: Promise.resolve(onigLib),
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

  const registry = await getRegistry();
  const grammar = await registry.loadGrammar(scopeName);
  if (!grammar) return null;

  return tokenizeInner(source, grammar);
};
