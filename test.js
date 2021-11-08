import assert from 'assert';

const js = async () => {
  const mod = await import('./dist/esm/index.js');
  const iter = await mod.tokenize('{}', 'json');
  assert(iter != null, 'got iter');
  assert.deepStrictEqual(iter.next(), { done: false, value: { scope: 'source.json', type: 'start' } });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'meta.structure.dictionary.json', type: 'start' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'punctuation.definition.dictionary.begin.json', type: 'start' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: {
      scopes: ['source.json', 'meta.structure.dictionary.json', 'punctuation.definition.dictionary.begin.json'],
      type: 'token',
      text: '{',
    },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'punctuation.definition.dictionary.begin.json', type: 'end' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'punctuation.definition.dictionary.end.json', type: 'start' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: {
      scopes: ['source.json', 'meta.structure.dictionary.json', 'punctuation.definition.dictionary.end.json'],
      type: 'token',
      text: '}',
    },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { type: 'line' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'punctuation.definition.dictionary.end.json', type: 'end' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'meta.structure.dictionary.json', type: 'end' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: false,
    value: { scope: 'source.json', type: 'end' },
  });
  assert.deepStrictEqual(iter.next(), {
    done: true,
    value: void 0,
  });
};

const rust = async () => {
  const mod = await import('./dist/esm/index.js');
  const code = `impl Parse for ArgNamed {
  fn parse(input: ParseStream) -> Result<Self> {
    Ok(ArgNamed {
      name: input.parse()?,
      assign_token: input.parse()?,
      value: input.parse()?,
    })
  }
}
`;

  const iter = await mod.tokenize('{}', 'rust');
  for (const tok of iter) {
  }
};

const main = async () => {
  await js();
  await rust();
};

main()
  .then(() => console.log('ok'))
  .catch((e) => {
    console.error('error: ' + ((e && e.stack) || e));
    process.exit(1);
  });
