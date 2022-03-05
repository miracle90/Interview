const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const sourceCode = `console.log("hello");`;
const ast = parser.parse(sourceCode, {
  sourceType: "module",
  plugins: ["jsx"],
});

traverse(ast, {
  CallExpression(path) {
    if (
      types.isMemberExpression(path.node.callee) &&
      path.node.callee.object.name === "console" &&
      ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
    ) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(
        types.stringLiteral(`filename: (${line}, ${column})`)
      );
    }
  },
});
const { code } = generate(ast);
console.log(code);
