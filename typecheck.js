const ts = require("typescript");
const fs = require("fs");
const files = [
  "./data/articles/worker-comp-spokes-1.ts",
  "./data/articles/worker-comp-spokes-2.ts",
  "./data/articles/worker-comp-spokes-3.ts",
  "./data/articles/worker-comp-spokes-4.ts",
  "./data/articles/worker-comp-spokes-5.ts",
  "./data/articles/worker-comp-spokes-6.ts",
  "./data/articles/worker-comp-spokes-7.ts",
  "./data/articles/worker-comp-spokes-8.ts",
  "./data/articles/worker-comp-spokes-9.ts",
  "./components/ArticleViz.tsx",
  "./data/categories.ts",
];
let allOk = true;
for (const f of files) {
  try {
    const src = fs.readFileSync(f, "utf8");
    const result = ts.transpileModule(src, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2017,
        skipLibCheck: true,
      },
    });
    if (result.diagnostics && result.diagnostics.length > 0) {
      console.error(f + ": ERRORS");
      result.diagnostics.forEach(d =>
        console.error("  " + ts.flattenDiagnosticMessageText(d.messageText, "\n"))
      );
      allOk = false;
    } else {
      console.log(f + ": OK");
    }
  } catch (e) {
    console.error(f + ": PARSE ERROR - " + e.message);
    allOk = false;
  }
}
process.exit(allOk ? 0 : 1);
