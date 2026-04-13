const ts = require("typescript");
const program = ts.createProgram(["./components/ArticleViz.tsx"], {
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ES2017,
  skipLibCheck: true,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  paths: { "@/*": ["./*"] },
  baseUrl: ".",
  noEmit: true,
  strict: true
});
const diags = ts.getPreEmitDiagnostics(program);
let count = 0;
diags.forEach(d => {
  const file = d.file ? d.file.fileName : "unknown";
  if (!file.includes("node_modules")) {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    const line = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : "?";
    console.error(file + ":" + line + ": " + msg);
    count++;
  }
});
if (count === 0) console.log("Full type check passed");
else console.log(count + " error(s) found");
