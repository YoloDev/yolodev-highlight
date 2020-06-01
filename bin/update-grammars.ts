import ora, { Ora } from 'ora';

import { F_OK } from 'constants';
import { Octokit } from '@octokit/rest';
import StreamZip from 'node-stream-zip';
import download from 'download';
import { promises as fs } from 'fs';
import json5 from 'json5';
import mkdirp from 'mkdirp';
import path from 'path';
import prettier from 'prettier';
import yaml from 'js-yaml';

type Grammar = {
  readonly name: string | null;
  readonly scopeName: string;
  readonly aliases: string[];
  readonly grammarFile: string;
};

type Grammars = {
  [scopeName: string]: Grammar | undefined;
};

const unpackGrammars = (file: string, dest: string) =>
  new Promise<string[]>((resolve, reject) => {
    let ongoing = 0;
    let done = false;
    const results: string[] = [];

    const zip = new StreamZip({
      file: file,
      storeEntries: true,
    });

    const checkDone = () => {
      if (ongoing === 0 && done) {
        resolve(results);
      }
    };

    zip.on('error', (err) => {
      zip.close(() => reject(err));
    });

    zip.on('entry', (entry) => {
      if (entry.name.endsWith('.tmLanguage.json')) {
        const { name } = entry;
        const parts = name.split(/[\/\\]/g);
        parts.shift();
        const baseName = parts.join('-');
        const destFile = path.resolve(dest, baseName);
        ongoing++;
        zip.extract(entry.name, destFile, (err) => {
          ongoing--;

          if (err) {
            zip.close(() => reject(err));
            return;
          }

          results.push(baseName);
          checkDone();
        });
      }
    });

    zip.on('ready', () => {
      done = true;
      checkDone();
    });
  });

const main = async (spinner: Ora) => {
  spinner.start('initializing');
  await mkdirp(path.resolve(__dirname, '..', 'dl'));
  await mkdirp(path.resolve(__dirname, '..', 'gen'));
  await mkdirp(path.resolve(__dirname, '..', 'grammars', 'vscode'));
  const genDir = path.resolve(__dirname, '..', 'gen');
  spinner.succeed();

  spinner.start('getting latest vscode release version');
  const client = new Octokit();
  const release = await client.repos.getLatestRelease({
    owner: 'microsoft',
    repo: 'vscode',
  });
  spinner.succeed(`getting latest vscode release version: ${release.data.tag_name}`);

  const dlPath = release.data.zipball_url;
  const targetDir = path.resolve(__dirname, '..', 'dl');
  const target = path.resolve(targetDir, path.basename(dlPath) + '.zip');

  // try {
  //   await fs.access(target, F_OK);
  //   spinner.succeed('already up to date');
  // } catch (e) {}

  // spinner.start('downloading release');
  // await download(dlPath, targetDir, {
  //   filename: path.basename(dlPath) + '.zip',
  // });
  // spinner.succeed();

  spinner.start('unpacking grammars');
  const grammarsDir = path.resolve(__dirname, '..', 'grammars');
  const grammarFiles = await unpackGrammars(target, path.resolve(grammarsDir, 'vscode'));
  for (let i = 0; i < grammarFiles.length; i++) {
    grammarFiles[i] = path.join('vscode', grammarFiles[i]);
  }
  spinner.succeed();

  spinner.start('generating grammar list');
  for (const customGrammar of await fs.readdir(path.resolve(grammarsDir, 'custom'))) {
    grammarFiles.push(path.join('custom', customGrammar));
  }

  const grammars: Grammars = {};
  for (const grammarFile of grammarFiles) {
    const grammarPath = path.resolve(grammarsDir, grammarFile);
    const content = await fs.readFile(grammarPath, 'utf-8');
    try {
      const parsed = json5.parse(content);
      const { name, scopeName } = parsed;

      if (!scopeName) {
        spinner.warn(`missing scopeName in '${grammarFile}'`);
        spinner.start('generating grammar list');
        continue;
      }

      grammars[scopeName] = { name: name ?? null, scopeName, aliases: [], grammarFile };
    } catch (e) {
      spinner.warn(`failed to parse '${grammarFile}': ${e}`);
      spinner.start('generating grammar list');
    }
  }

  const aliasesSouce = await fs.readFile(path.resolve(grammarsDir, 'aliases.yaml'), 'utf-8');
  const aliases = yaml.safeLoad(aliasesSouce);
  for (const [sourceScope, sourceAliases] of Object.entries(aliases)) {
    const source = grammars[sourceScope];
    if (!source) {
      spinner.warn(`scope '${sourceScope}' not found`);
      spinner.start('generating grammar list');
      continue;
    }

    if (typeof sourceAliases === 'string') {
      source.aliases.push(sourceAliases);
    } else {
      source.aliases.push(...(sourceAliases as string[]));
    }
  }

  await fs.writeFile(path.resolve(genDir, 'grammars.json'), JSON.stringify(grammars, void 0, 2));
  spinner.succeed();

  spinner.start('generate code');
  const importCases: string[] = [];
  const getLangCases: string[] = [];
  for (const [sourceScope, grammar] of Object.entries(grammars)) {
    if (!grammar) continue;
    importCases.push(
      `case '${sourceScope}': return import('../grammars/${grammar.grammarFile}').then(m => m.default);`,
    );
    getLangCases.push(`case '${sourceScope}': return '${sourceScope}';`);

    for (const alias of grammar.aliases) {
      getLangCases.push(`case '${alias}': return '${sourceScope}';`);
    }
  }

  const lines = [
    // loadGrammarFile
    'export const loadGrammarFile = (scope: string): Promise<string | null> => {',
    'switch (scope) {',
    ...importCases,
    'default: return Promise.resolve(null);',
    '}',
    '}',

    // getLang
    `export const getLang = (lang: string): string | null => {`,
    `switch (lang) {`,
    ...getLangCases,
    `default: return null;`,
    `}`,
    `}`,
  ];

  const typescriptContent = prettier.format(lines.join('\n'), { parser: 'typescript' });
  await fs.writeFile(path.resolve(genDir, 'imports.ts'), typescriptContent);
  spinner.succeed();
};

const spinner = ora();
main(spinner)
  .catch((e) => {
    spinner.fail(e.stack || e);
    process.exit(1);
  })
  .then(() => {
    if (spinner.isSpinning) {
      spinner.succeed('done');
    }
  });
