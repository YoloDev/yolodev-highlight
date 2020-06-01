export const loadGrammarFile = (scope: string): Promise<string | null> => {
  switch (scope) {
    case "source.clojure":
      return import(
        "../grammars/vscode/extensions-clojure-syntaxes-clojure.tmLanguage.json"
      ).then((m) => m.default);
    case "source.batchfile":
      return import(
        "../grammars/vscode/extensions-bat-syntaxes-batchfile.tmLanguage.json"
      ).then((m) => m.default);
    case "source.coffee":
      return import(
        "../grammars/vscode/extensions-coffeescript-syntaxes-coffeescript.tmLanguage.json"
      ).then((m) => m.default);
    case "source.dockerfile":
      return import(
        "../grammars/vscode/extensions-docker-syntaxes-docker.tmLanguage.json"
      ).then((m) => m.default);
    case "source.diff":
      return import(
        "../grammars/vscode/extensions-git-syntaxes-diff.tmLanguage.json"
      ).then((m) => m.default);
    case "source.go":
      return import(
        "../grammars/vscode/extensions-go-syntaxes-go.tmLanguage.json"
      ).then((m) => m.default);
    case "source.ignore":
      return import(
        "../grammars/vscode/extensions-git-syntaxes-ignore.tmLanguage.json"
      ).then((m) => m.default);
    case "text.git-rebase":
      return import(
        "../grammars/vscode/extensions-git-syntaxes-git-rebase.tmLanguage.json"
      ).then((m) => m.default);
    case "text.git-commit":
      return import(
        "../grammars/vscode/extensions-git-syntaxes-git-commit.tmLanguage.json"
      ).then((m) => m.default);
    case "source.fsharp":
      return import(
        "../grammars/vscode/extensions-fsharp-syntaxes-fsharp.tmLanguage.json"
      ).then((m) => m.default);
    case "source.groovy":
      return import(
        "../grammars/vscode/extensions-groovy-syntaxes-groovy.tmLanguage.json"
      ).then((m) => m.default);
    case "source.hlsl":
      return import(
        "../grammars/vscode/extensions-hlsl-syntaxes-hlsl.tmLanguage.json"
      ).then((m) => m.default);
    case "source.c":
      return import(
        "../grammars/vscode/extensions-cpp-syntaxes-c.tmLanguage.json"
      ).then((m) => m.default);
    case "source.c.platform":
      return import(
        "../grammars/vscode/extensions-cpp-syntaxes-platform.tmLanguage.json"
      ).then((m) => m.default);
    case "source.css":
      return import(
        "../grammars/vscode/extensions-css-syntaxes-css.tmLanguage.json"
      ).then((m) => m.default);
    case "source.cs":
      return import(
        "../grammars/vscode/extensions-csharp-syntaxes-csharp.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.handlebars":
      return import(
        "../grammars/vscode/extensions-handlebars-syntaxes-Handlebars.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.derivative":
      return import(
        "../grammars/vscode/extensions-html-syntaxes-html-derivative.tmLanguage.json"
      ).then((m) => m.default);
    case "source.ini":
      return import(
        "../grammars/vscode/extensions-ini-syntaxes-ini.tmLanguage.json"
      ).then((m) => m.default);
    case "source.json":
      return import(
        "../grammars/vscode/extensions-json-syntaxes-JSON.tmLanguage.json"
      ).then((m) => m.default);
    case "source.json.comments":
      return import(
        "../grammars/vscode/extensions-json-syntaxes-JSONC.tmLanguage.json"
      ).then((m) => m.default);
    case "text.log":
      return import(
        "../grammars/vscode/extensions-log-syntaxes-log.tmLanguage.json"
      ).then((m) => m.default);
    case "source.lua":
      return import(
        "../grammars/vscode/extensions-lua-syntaxes-lua.tmLanguage.json"
      ).then((m) => m.default);
    case "source.makefile":
      return import(
        "../grammars/vscode/extensions-make-syntaxes-make.tmLanguage.json"
      ).then((m) => m.default);
    case "source.css.less":
      return import(
        "../grammars/vscode/extensions-less-syntaxes-less.tmLanguage.json"
      ).then((m) => m.default);
    case "source.java":
      return import(
        "../grammars/vscode/extensions-java-syntaxes-java.tmLanguage.json"
      ).then((m) => m.default);
    case "source.perl.6":
      return import(
        "../grammars/vscode/extensions-perl-syntaxes-perl6.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.basic":
      return import(
        "../grammars/vscode/extensions-html-syntaxes-html.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.markdown":
      return import(
        "../grammars/vscode/extensions-markdown-basics-syntaxes-markdown.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.php":
      return import(
        "../grammars/vscode/extensions-php-syntaxes-html.tmLanguage.json"
      ).then((m) => m.default);
    case "source.regexp.python":
      return import(
        "../grammars/vscode/extensions-python-syntaxes-MagicRegExp.tmLanguage.json"
      ).then((m) => m.default);
    case "source.powershell":
      return import(
        "../grammars/vscode/extensions-powershell-syntaxes-powershell.tmLanguage.json"
      ).then((m) => m.default);
    case "text.pug":
      return import(
        "../grammars/vscode/extensions-pug-syntaxes-pug.tmLanguage.json"
      ).then((m) => m.default);
    case "text.html.cshtml":
      return import(
        "../grammars/vscode/extensions-razor-syntaxes-cshtml.tmLanguage.json"
      ).then((m) => m.default);
    case "source.rust":
      return import(
        "../grammars/vscode/extensions-rust-syntaxes-rust.tmLanguage.json"
      ).then((m) => m.default);
    case "source.sassdoc":
      return import(
        "../grammars/vscode/extensions-scss-syntaxes-sassdoc.tmLanguage.json"
      ).then((m) => m.default);
    case "source.shaderlab":
      return import(
        "../grammars/vscode/extensions-shaderlab-syntaxes-shaderlab.tmLanguage.json"
      ).then((m) => m.default);
    case "source.perl":
      return import(
        "../grammars/vscode/extensions-perl-syntaxes-perl.tmLanguage.json"
      ).then((m) => m.default);
    case "source.r":
      return import(
        "../grammars/vscode/extensions-r-syntaxes-r.tmLanguage.json"
      ).then((m) => m.default);
    case "source.shell":
      return import(
        "../grammars/vscode/extensions-shellscript-syntaxes-shell-unix-bash.tmLanguage.json"
      ).then((m) => m.default);
    case "source.sql":
      return import(
        "../grammars/vscode/extensions-sql-syntaxes-sql.tmLanguage.json"
      ).then((m) => m.default);
    case "source.css.scss":
      return import(
        "../grammars/vscode/extensions-scss-syntaxes-scss.tmLanguage.json"
      ).then((m) => m.default);
    case "documentation.injection":
      return import(
        "../grammars/vscode/extensions-typescript-basics-syntaxes-jsdoc.injection.tmLanguage.json"
      ).then((m) => m.default);
    case "source.ruby":
      return import(
        "../grammars/vscode/extensions-ruby-syntaxes-ruby.tmLanguage.json"
      ).then((m) => m.default);
    case "text.xml.xsl":
      return import(
        "../grammars/vscode/extensions-xml-syntaxes-xsl.tmLanguage.json"
      ).then((m) => m.default);
    case "text.xml":
      return import(
        "../grammars/vscode/extensions-xml-syntaxes-xml.tmLanguage.json"
      ).then((m) => m.default);
    case "source.python":
      return import(
        "../grammars/vscode/extensions-python-syntaxes-MagicPython.tmLanguage.json"
      ).then((m) => m.default);
    case "source.yaml":
      return import(
        "../grammars/vscode/extensions-yaml-syntaxes-yaml.tmLanguage.json"
      ).then((m) => m.default);
    case "source.js":
      return import(
        "../grammars/vscode/extensions-javascript-syntaxes-JavaScript.tmLanguage.json"
      ).then((m) => m.default);
    case "source.js.jsx":
      return import(
        "../grammars/vscode/extensions-javascript-syntaxes-JavaScriptReact.tmLanguage.json"
      ).then((m) => m.default);
    case "source.objc":
      return import(
        "../grammars/vscode/extensions-objective-c-syntaxes-objective-c.tmLanguage.json"
      ).then((m) => m.default);
    case "source.php":
      return import(
        "../grammars/vscode/extensions-php-syntaxes-php.tmLanguage.json"
      ).then((m) => m.default);
    case "source.swift":
      return import(
        "../grammars/vscode/extensions-swift-syntaxes-swift.tmLanguage.json"
      ).then((m) => m.default);
    case "source.tsx":
      return import(
        "../grammars/vscode/extensions-typescript-basics-syntaxes-TypeScriptReact.tmLanguage.json"
      ).then((m) => m.default);
    case "source.objcpp":
      return import(
        "../grammars/vscode/extensions-objective-c-syntaxes-objective-c++.tmLanguage.json"
      ).then((m) => m.default);
    case "source.ts":
      return import(
        "../grammars/vscode/extensions-typescript-basics-syntaxes-TypeScript.tmLanguage.json"
      ).then((m) => m.default);
    case "source.cpp.embedded.macro":
      return import(
        "../grammars/vscode/extensions-cpp-syntaxes-cpp.embedded.macro.tmLanguage.json"
      ).then((m) => m.default);
    case "source.cpp":
      return import(
        "../grammars/vscode/extensions-cpp-syntaxes-cpp.tmLanguage.json"
      ).then((m) => m.default);
    case "source.jsonnet":
      return import("../grammars/custom/jsonnet.tmLanguage.json").then(
        (m) => m.default
      );
    default:
      return Promise.resolve(null);
  }
};
export const getLang = (lang: string): string | null => {
  switch (lang) {
    case "source.clojure":
      return "source.clojure";
    case "source.batchfile":
      return "source.batchfile";
    case "source.coffee":
      return "source.coffee";
    case "source.dockerfile":
      return "source.dockerfile";
    case "source.diff":
      return "source.diff";
    case "source.go":
      return "source.go";
    case "source.ignore":
      return "source.ignore";
    case "text.git-rebase":
      return "text.git-rebase";
    case "text.git-commit":
      return "text.git-commit";
    case "source.fsharp":
      return "source.fsharp";
    case "fsharp":
      return "source.fsharp";
    case "fsx":
      return "source.fsharp";
    case "fs":
      return "source.fsharp";
    case "source.groovy":
      return "source.groovy";
    case "source.hlsl":
      return "source.hlsl";
    case "source.c":
      return "source.c";
    case "source.c.platform":
      return "source.c.platform";
    case "source.css":
      return "source.css";
    case "source.cs":
      return "source.cs";
    case "c#":
      return "source.cs";
    case "csharp":
      return "source.cs";
    case "dotnet":
      return "source.cs";
    case "text.html.handlebars":
      return "text.html.handlebars";
    case "text.html.derivative":
      return "text.html.derivative";
    case "source.ini":
      return "source.ini";
    case "source.json":
      return "source.json";
    case "json":
      return "source.json";
    case "source.json.comments":
      return "source.json.comments";
    case "text.log":
      return "text.log";
    case "source.lua":
      return "source.lua";
    case "source.makefile":
      return "source.makefile";
    case "source.css.less":
      return "source.css.less";
    case "source.java":
      return "source.java";
    case "source.perl.6":
      return "source.perl.6";
    case "text.html.basic":
      return "text.html.basic";
    case "text.html.markdown":
      return "text.html.markdown";
    case "markdown":
      return "text.html.markdown";
    case "md":
      return "text.html.markdown";
    case "text.html.php":
      return "text.html.php";
    case "source.regexp.python":
      return "source.regexp.python";
    case "source.powershell":
      return "source.powershell";
    case "text.pug":
      return "text.pug";
    case "text.html.cshtml":
      return "text.html.cshtml";
    case "source.rust":
      return "source.rust";
    case "rust":
      return "source.rust";
    case "source.sassdoc":
      return "source.sassdoc";
    case "source.shaderlab":
      return "source.shaderlab";
    case "source.perl":
      return "source.perl";
    case "source.r":
      return "source.r";
    case "source.shell":
      return "source.shell";
    case "source.sql":
      return "source.sql";
    case "source.css.scss":
      return "source.css.scss";
    case "documentation.injection":
      return "documentation.injection";
    case "source.ruby":
      return "source.ruby";
    case "text.xml.xsl":
      return "text.xml.xsl";
    case "text.xml":
      return "text.xml";
    case "source.python":
      return "source.python";
    case "source.yaml":
      return "source.yaml";
    case "source.js":
      return "source.js";
    case "source.js.jsx":
      return "source.js.jsx";
    case "source.objc":
      return "source.objc";
    case "source.php":
      return "source.php";
    case "source.swift":
      return "source.swift";
    case "source.tsx":
      return "source.tsx";
    case "source.objcpp":
      return "source.objcpp";
    case "source.ts":
      return "source.ts";
    case "source.cpp.embedded.macro":
      return "source.cpp.embedded.macro";
    case "source.cpp":
      return "source.cpp";
    case "source.jsonnet":
      return "source.jsonnet";
    case "jsonnet":
      return "source.jsonnet";
    case "libjsonnet":
      return "source.jsonnet";
    default:
      return null;
  }
};
