import type { Codemod } from "codemod:ast-grep";
import type JS from "codemod:ast-grep/langs/javascript";
import type TS from "codemod:ast-grep/langs/typescript";
import type TSX from "codemod:ast-grep/langs/tsx";

// @ts-ignore
import { rules } from "./rules";

type Lang = JS | TS | TSX;

type MatchType =
  | "ImportSpecifier"
  | "CallExpression"
  | "Identifier"
  | "JSXIdentifier"
  | "ObjectProperty"
  | "NewExpression";

type RuleMatch = {
  type?: MatchType;
  imported?: string;
  callee?: string;
  name?: string;
  key?: string;
  source?: string;
};

type RuleWhen = {
  withinCallCallee?: string | string[];
};

type RuleTransform = {
  replaceWith?: string;
  replaceImportSource?: string;
  renameCallee?: string;
  replaceKey?: string;
  objectKeyMap?: Record<string, string>;
  annotate?: {
    severity: string;
    message: string;
  };
  convertNewToCall?: boolean;
  preserveArguments?: boolean;
};

type RuleLike = {
  match?: RuleMatch;
  when?: RuleWhen;
  transform?: RuleTransform;
};

type ImportSpecifierInfo = {
  imported: string;
  local: string;
  raw: string;
};

type ParsedImportDecl = {
  isTypeOnly: boolean;
  source: string;
  specifiers: ImportSpecifierInfo[];
};

type ImportBinding = {
  local: string;
  source: string;
  declNode: any;
  spec: ImportSpecifierInfo;
  isTypeOnly: boolean;
};

const typedRules: RuleLike[] = Array.isArray(rules) ? (rules as RuleLike[]) : [];
const REVIEW_MARKER = "codemod-review";

function isValidPattern(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function arrify<T>(value: T | T[] | undefined | null): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseNamedImportDeclaration(text: string): ParsedImportDecl | null {
  const trimmed = text.trim();

  const match = trimmed.match(
    /^import\s+(type\s+)?\{\s*([^}]*)\s*\}\s+from\s+["']([^"']+)["']\s*;?$/
  );

  if (!match) return null;

  const [, typeGroup = "", specBodyRaw = "", sourceRaw = ""] = match;

  if (!isValidPattern(sourceRaw)) return null;

  const isTypeOnly = Boolean(typeGroup);
  const specBody = specBodyRaw.trim();
  const source = sourceRaw.trim();

  if (!specBody) {
    return {
      isTypeOnly,
      source,
      specifiers: [],
    };
  }

  const specifiers: ImportSpecifierInfo[] = specBody
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is string => s.length > 0)
    .map((raw): ImportSpecifierInfo => {
      const aliasMatch = raw.match(
        /^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/
      );

      if (aliasMatch) {
        const [, imported = "", local = ""] = aliasMatch;
        if (isValidPattern(imported) && isValidPattern(local)) {
          return { imported, local, raw };
        }
      }

      return {
        imported: raw,
        local: raw,
        raw,
      };
    });

  return { isTypeOnly, source, specifiers };
}

function buildNamedImportDeclaration(
  source: string,
  specifiers: ImportSpecifierInfo[],
  isTypeOnly = false
): string | null {
  if (!isValidPattern(source)) return null;
  if (specifiers.length === 0) return null;

  const rendered = specifiers
    .map((s) => (s.imported === s.local ? s.imported : `${s.imported} as ${s.local}`))
    .join(", ");

  return `import ${isTypeOnly ? "type " : ""}{ ${rendered} } from "${source}";`;
}

function getImportRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "ImportSpecifier");
}

function getCallRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "CallExpression");
}

function getNewRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "NewExpression");
}

function getObjectPropertyRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "ObjectProperty");
}

function getJSXRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "JSXIdentifier");
}

function getIdentifierRules(): RuleLike[] {
  return typedRules.filter((rule) => rule.match?.type === "Identifier");
}

function getAnnotateRules(): RuleLike[] {
  return typedRules.filter((rule) => Boolean(rule.transform?.annotate));
}

function buildImportIndex(rootNode: any): Map<string, ImportBinding[]> {
  const index = new Map<string, ImportBinding[]>();

  const decls = rootNode.findAll({
    rule: {
      kind: "import_statement",
    },
  });

  for (const decl of decls) {
    const parsed = parseNamedImportDeclaration(decl.text());
    if (!parsed) continue;

    for (const spec of parsed.specifiers) {
      const existing = index.get(spec.imported) ?? [];
      existing.push({
        local: spec.local,
        source: parsed.source,
        declNode: decl,
        spec,
        isTypeOnly: parsed.isTypeOnly,
      });
      index.set(spec.imported, existing);
    }
  }

  return index;
}

function dedupeImportSpecifiers(specifiers: ImportSpecifierInfo[]): ImportSpecifierInfo[] {
  const seen = new Set<string>();
  const out: ImportSpecifierInfo[] = [];

  for (const spec of specifiers) {
    const key = `${spec.imported}::${spec.local}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(spec);
  }

  return out;
}

function addReviewCommentIfNeeded(
  originalNodeText: string,
  annotatedText: string,
  fileText: string
): string | null {
  if (fileText.includes(annotatedText)) return null;
  if (originalNodeText.includes(REVIEW_MARKER)) return null;
  return annotatedText;
}

function renameJSXTagText(text: string, from: string, to: string): string {
  return text
    .replace(new RegExp(`^<${escapeRegExp(from)}\\b`), `<${to}`)
    .replace(new RegExp(`^</${escapeRegExp(from)}\\b`), `</${to}`);
}

function applyJsxRenames(source: string, rules: RuleLike[]): string {
  let output = source;

  for (const rule of rules) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform) continue;
    if (match.type !== "JSXIdentifier") continue;

    const from = match.name;
    const to = transform.replaceWith;

    if (!isValidPattern(from) || !isValidPattern(to)) continue;

    output = output.replace(
      new RegExp(`<${escapeRegExp(from)}(?=[\\s>/])`, "g"),
      `<${to}`
    );
    output = output.replace(
      new RegExp(`</${escapeRegExp(from)}(?=[\\s>])`, "g"),
      `</${to}`
    );
  }

  return output;
}

function applyIdentifierRenames(source: string, rules: RuleLike[]): string {
  let output = source;

  for (const rule of rules) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform) continue;
    if (match.type !== "Identifier") continue;
    if (!isValidPattern(match.name)) continue;
    if (!isValidPattern(transform.replaceWith)) continue;

    output = output.replace(
      new RegExp(`\\b${escapeRegExp(match.name)}\\b`, "g"),
      transform.replaceWith
    );
  }

  return output;
}

function renameKeysInObjectLiteralText(
  objectLiteralText: string,
  keyMap: Record<string, string>
): string {
  let out = objectLiteralText;

  for (const [from, to] of Object.entries(keyMap)) {
    const escFrom = escapeRegExp(from);

    out = out.replace(
      new RegExp(`([,{]\\s*)${escFrom}(\\s*:)`, "g"),
      `$1${to}$2`
    );

    out = out.replace(
      new RegExp(`([,{]\\s*)${escFrom}(\\s*[},])`, "g"),
      `$1${to}$2`
    );
  }

  return out;
}

function replaceFirstArgumentObjectKeys(
  callText: string,
  keyMap: Record<string, string>
): string {
  const open = callText.indexOf("(");
  const close = callText.lastIndexOf(")");
  if (open < 0 || close < 0 || close <= open) return callText;

  const inside = callText.slice(open + 1, close).trim();
  if (!inside.startsWith("{") || !inside.endsWith("}")) return callText;

  const renamed = renameKeysInObjectLiteralText(inside, keyMap);
  if (renamed === inside) return callText;

  return `${callText.slice(0, open + 1)}${renamed}${callText.slice(close)}`;
}

function nearestCallText(node: any, maxDepth = 8): string | null {
  let cur = node?.parent?.();
  for (let i = 0; i < maxDepth && cur; i++) {
    const txt = cur.text();
    if (/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?\s*\(/.test(txt)) {
      return txt;
    }
    cur = cur.parent?.();
  }
  return null;
}

function extractCalledNamesFromText(callText: string): string[] {
  const out = new Set<string>();

  const direct = callText.match(/^([A-Za-z_$][\w$]*)\s*\(/);
  const directName = direct?.[1];
  if (directName) {
    out.add(directName);
  }

  const member = callText.match(/^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*\(/);
  const objectName = member?.[1];
  const methodName = member?.[2];

  if (objectName && methodName) {
    out.add(objectName);
    out.add(methodName);
    out.add(`${objectName}.${methodName}`);
  }

  return [...out];
}

function whenMatches(node: any, when?: RuleWhen): boolean {
  if (!when) return true;

  if (when.withinCallCallee) {
    const allowed = arrify(when.withinCallCallee);
    const callText = nearestCallText(node);
    if (!callText) return false;

    const names = extractCalledNamesFromText(callText);
    return allowed.some((name) => names.includes(name));
  }

  return true;
}

function hasPotentialShadowingDeclaration(_rootNode: any, _localName: string): boolean {
  return false;
}

function getBindingsForImportedSymbol(
  importIndex: Map<string, ImportBinding[]>,
  importedPattern: string,
  sourcePattern?: string
): ImportBinding[] {
  const bindings = importIndex.get(importedPattern) ?? [];

  if (!isValidPattern(sourcePattern)) return bindings;

  return bindings.filter((binding) => binding.source === sourcePattern);
}

function rewriteNewExpression(
  originalText: string,
  localName: string,
  transform: RuleTransform
): string {
  if (isValidPattern(transform.replaceWith)) {
    return transform.replaceWith;
  }

  if (!isValidPattern(transform.renameCallee)) {
    return originalText;
  }

  if (transform.convertNewToCall) {
    const argsMatch = originalText.match(
      new RegExp(`^new\\s+${escapeRegExp(localName)}\\s*\\(([\s\S]*)\\)$`)
    );
    const args = argsMatch ? argsMatch[1] : "";
    if (transform.preserveArguments) {
      return `${transform.renameCallee}(${args})`;
    }
    return `${transform.renameCallee}()`;
  }

  return originalText.replace(
    new RegExp(`^new\\s+${escapeRegExp(localName)}\\b`),
    transform.renameCallee
  );
}

const codemod: Codemod<Lang> = async (root) => {
  const rootNode = root.root();
  const fileText = rootNode.text();
  const edits: any[] = [];

  const importRules = getImportRules();
  const importDecls = rootNode.findAll({
    rule: {
      kind: "import_statement",
    },
  });

  for (const decl of importDecls) {
    const parsed = parseNamedImportDeclaration(decl.text());
    if (!parsed) continue;

    let changed = false;
    const groupedBySource = new Map<string, ImportSpecifierInfo[]>();

    for (const spec of parsed.specifiers) {
      let nextImported = spec.imported;
      let nextSource = parsed.source;

      for (const rule of importRules) {
        const match = rule.match;
        const transform = rule.transform;
        if (!match || !transform) continue;
        if (match.type !== "ImportSpecifier") continue;

        const importedPattern = match.imported;
        const sourcePattern = match.source;

        if (!isValidPattern(importedPattern)) continue;
        if (spec.imported !== importedPattern) continue;
        if (isValidPattern(sourcePattern) && parsed.source !== sourcePattern) continue;

        if (isValidPattern(transform.replaceWith)) {
          nextImported = transform.replaceWith;
          changed = true;
        }

        if (isValidPattern(transform.replaceImportSource)) {
          nextSource = transform.replaceImportSource;
          changed = true;
        }
      }

      const hadExplicitAlias = spec.imported !== spec.local;
      const nextLocal = hadExplicitAlias ? spec.local : nextImported;

      const arr = groupedBySource.get(nextSource) ?? [];
      arr.push({
        imported: nextImported,
        local: nextLocal,
        raw: spec.raw,
      });
      groupedBySource.set(nextSource, arr);
    }

    if (!changed) continue;

    const rebuiltDecls = Array.from(groupedBySource.entries())
      .map(([source, specs]) =>
        buildNamedImportDeclaration(source, dedupeImportSpecifiers(specs), parsed.isTypeOnly)
      )
      .filter(isNonNullable);

    if (rebuiltDecls.length === 0) continue;

    edits.push(decl.replace(rebuiltDecls.join("\n")));
  }

  const importIndex = buildImportIndex(rootNode);

  for (const rule of getCallRules()) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform) continue;
    if (match.type !== "CallExpression") continue;

    const importedPattern = match.callee;
    const sourcePattern = match.source;

    if (!isValidPattern(importedPattern)) continue;

    const bindings = getBindingsForImportedSymbol(
      importIndex,
      importedPattern,
      sourcePattern
    );

    for (const binding of bindings) {
      const localName = binding.local;

      if (hasPotentialShadowingDeclaration(rootNode, localName)) {
        continue;
      }

      const calls = rootNode.findAll({
        rule: {
          kind: "call_expression",
          has: {
            field: "function",
            pattern: localName,
          },
        },
      });

      for (const node of calls) {
        let text = node.text();

        if (
          isValidPattern(transform.renameCallee) &&
          binding.local === importedPattern
        ) {
          text = transform.renameCallee + text.slice(localName.length);
        }

        if (transform.objectKeyMap) {
          text = replaceFirstArgumentObjectKeys(text, transform.objectKeyMap);
        }

        if (text !== node.text()) {
          edits.push(node.replace(text));
        }
      }
    }
  }

  for (const rule of getObjectPropertyRules()) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform) continue;
    if (match.type !== "ObjectProperty") continue;

    const pattern = match.key;
    const replacement = transform.replaceKey;

    if (!isValidPattern(pattern)) continue;
    if (!isValidPattern(replacement)) continue;

    const props = rootNode.findAll({
      rule: {
        kind: "pair",
        has: {
          field: "key",
          pattern,
        },
      },
    });

    for (const node of props) {
      if (!whenMatches(node, rule.when)) continue;

      const nextText = node
        .text()
        .replace(new RegExp(`^${escapeRegExp(pattern)}\\b`), replacement);

      if (nextText !== node.text()) {
        edits.push(node.replace(nextText));
      }
    }
  }

  for (const rule of getNewRules()) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform) continue;
    if (match.type !== "NewExpression") continue;

    const importedPattern = match.callee;
    const sourcePattern = match.source;

    if (!isValidPattern(importedPattern)) continue;

    const bindings = getBindingsForImportedSymbol(
      importIndex,
      importedPattern,
      sourcePattern
    );

    for (const binding of bindings) {
      const localName = binding.local;

      const news = rootNode.findAll({
        rule: {
          kind: "new_expression",
          has: {
            field: "constructor",
            pattern: localName,
          },
        },
      });

      for (const node of news) {
        const isShadowed = hasPotentialShadowingDeclaration(rootNode, localName);

        if (binding.local !== importedPattern || isShadowed) {
          const annotate = transform.annotate;
          if (annotate) {
            const annotated = `/* ${REVIEW_MARKER}:${String(annotate.severity).toUpperCase()}: ${annotate.message} */\n${node.text()}`;
            const maybe = addReviewCommentIfNeeded(node.text(), annotated, fileText);
            if (maybe) {
              edits.push(node.replace(maybe));
            }
          }
          continue;
        }

        const nextText = rewriteNewExpression(node.text(), localName, transform);
        if (nextText !== node.text()) {
          edits.push(node.replace(nextText));
        }
      }
    }
  }

  for (const rule of getAnnotateRules()) {
    const match = rule.match;
    const transform = rule.transform;
    if (!match || !transform || !transform.annotate) continue;

    const annotation = transform.annotate;
    const markerText = `/* ${REVIEW_MARKER}:${String(annotation.severity).toUpperCase()}: ${annotation.message} */`;

    if (match.type === "CallExpression") {
      const importedPattern = match.callee;
      const sourcePattern = match.source;
      if (!isValidPattern(importedPattern)) continue;

      const bindings = getBindingsForImportedSymbol(
        importIndex,
        importedPattern,
        sourcePattern
      );

      for (const binding of bindings) {
        const calls = rootNode.findAll({
          rule: {
            kind: "call_expression",
            has: {
              field: "function",
              pattern: binding.local,
            },
          },
        });

        for (const node of calls) {
          const annotated = `${markerText}\n${node.text()}`;
          const maybe = addReviewCommentIfNeeded(node.text(), annotated, fileText);
          if (maybe) {
            edits.push(node.replace(maybe));
          }
        }
      }

      continue;
    }

    if (match.type === "NewExpression") {
      const importedPattern = match.callee;
      const sourcePattern = match.source;
      if (!isValidPattern(importedPattern)) continue;

      const bindings = getBindingsForImportedSymbol(
        importIndex,
        importedPattern,
        sourcePattern
      );

      for (const binding of bindings) {
        const news = rootNode.findAll({
          rule: {
            kind: "new_expression",
            has: {
              field: "constructor",
              pattern: binding.local,
            },
          },
        });

        for (const node of news) {
          const annotated = `${markerText}\n${node.text()}`;
          const maybe = addReviewCommentIfNeeded(node.text(), annotated, fileText);
          if (maybe) {
            edits.push(node.replace(maybe));
          }
        }
      }

      continue;
    }

    if (match.type === "ImportSpecifier") {
      const importedPattern = match.imported;
      const sourcePattern = match.source;
      if (!isValidPattern(importedPattern)) continue;

      const decls = rootNode.findAll({
        rule: {
          kind: "import_statement",
        },
      });

      for (const decl of decls) {
        const parsed = parseNamedImportDeclaration(decl.text());
        if (!parsed) continue;
        if (isValidPattern(sourcePattern) && parsed.source !== sourcePattern) continue;

        if (parsed.specifiers.some((s) => s.imported === importedPattern)) {
          const annotated = `${markerText}\n${decl.text()}`;
          const maybe = addReviewCommentIfNeeded(decl.text(), annotated, fileText);
          if (maybe) {
            edits.push(decl.replace(maybe));
          }
        }
      }
    }
  }

  let output = rootNode.commitEdits(edits);
  output = applyJsxRenames(output, getJSXRules());
  output = applyIdentifierRenames(output, getIdentifierRules());

  return output;
};

export default codemod;