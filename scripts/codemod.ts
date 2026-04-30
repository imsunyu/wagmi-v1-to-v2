import type { Codemod } from "codemod:ast-grep";
import type JS from "codemod:ast-grep/langs/javascript";
import type TS from "codemod:ast-grep/langs/typescript";
import type TSX from "codemod:ast-grep/langs/tsx";

// @ts-ignore
import { rules } from "./rules";

type Lang = JS | TS | TSX;

const codemod: Codemod<Lang> = async (root) => {
  const rootNode = root.root();
  const edits: any[] = [];

  for (const rule of rules) {
    if (rule.match?.type === "ImportSpecifier") {
      const specifiers = rootNode.findAll({
        rule: {
          kind: "import_specifier",
          has: {
            field: "name",
            pattern: rule.match.imported,
          },
        },
      });

      for (const node of specifiers) {
        if ("replaceWith" in rule.transform) {
          edits.push(node.replace(String(rule.transform.replaceWith)));
        }

        if ("replaceImportSource" in rule.transform) {
          const decl = node.parent()?.parent();
          if (decl) {
            edits.push(
              decl.replace(
                decl
                  .text()
                  .replace(
                    /from\s+["'][^"']+["']/,
                    `from "${String(
                      rule.transform.replaceImportSource
                    )}"`
                  )
              )
            );
          }
        }
      }
    }
  }

  for (const rule of rules) {
    if (rule.match?.type === "CallExpression") {
      const calls = rootNode.findAll({
        rule: {
          kind: "call_expression",
          has: {
            field: "function",
            pattern: rule.match.callee,
          },
        },
      });

      for (const node of calls) {
        let text = node.text();

        if ("renameCallee" in rule.transform) {
          text =
            String(rule.transform.renameCallee) +
            text.slice(rule.match.callee.length);
        }

        if ("objectKeyMap" in rule.transform) {
          for (const [from, to] of Object.entries(
            rule.transform.objectKeyMap
          )) {
            text = text.replace(
              new RegExp(`\\b${from}\\b`, "g"),
              String(to)
            );
          }
        }

        if (text !== node.text()) {
          edits.push(node.replace(text));
        }
      }
    }
  }

  for (const rule of rules) {
    if (
      rule.match?.type === "Identifier" ||
      rule.match?.type === "JSXIdentifier"
    ) {
      const nodes = rootNode.findAll({
        rule: {
          kind: "identifier",
          pattern: rule.match.name,
        },
      });

      for (const node of nodes) {
        if ("replaceWith" in rule.transform) {
          edits.push(node.replace(String(rule.transform.replaceWith)));
        }
      }
    }
  }

  for (const rule of rules) {
    if (rule.match?.type === "ObjectProperty") {
      const props = rootNode.findAll({
        rule: {
          kind: "pair",
          has: {
            field: "key",
            pattern: rule.match.key,
          },
        },
      });

      for (const node of props) {
        if ("replaceKey" in rule.transform) {
          edits.push(
            node.replace(
              node
                .text()
                .replace(
                  new RegExp(`^${rule.match.key}\\b`),
                  String(rule.transform.replaceKey)
                )
            )
          );
        }
      }
    }
  }

  for (const rule of rules) {
    if (rule.match?.type === "NewExpression") {
      const news = rootNode.findAll({
        rule: {
          kind: "new_expression",
          has: {
            field: "constructor",
            pattern: rule.match.callee,
          },
        },
      });

      for (const node of news) {
        if ("replaceWith" in rule.transform) {
          edits.push(node.replace(String(rule.transform.replaceWith)));
        } else if ("renameCallee" in rule.transform) {
          edits.push(
            node.replace(
              node
                .text()
                .replace(
                  new RegExp(`^new\\s+${rule.match.callee}`),
                  String(rule.transform.renameCallee)
                )
            )
          );
        }
      }
    }
  }

  for (const rule of rules) {
    if (rule.transform?.annotate) {
      const nodes = rootNode.findAll({
        rule: {
          pattern:
            rule.match?.callee ??
            rule.match?.imported ??
            rule.match?.name ??
            "",
        },
      });

      for (const node of nodes) {
        edits.push(
          node.replace(
            `/* ${String(
              rule.transform.annotate.severity
            ).toUpperCase()}: ${String(
              rule.transform.annotate.message
            )} */\n${node.text()}`
          )
        );
      }
    }
  }

  return rootNode.commitEdits(edits);
};

export default codemod;