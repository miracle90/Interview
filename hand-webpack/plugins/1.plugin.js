let babel = require("@babel/core");
let types = require("babel-types");
const visitor = {
  ImportDeclaration: {
    enter(path, state = { opts }) {
      const specifiers = path.node.specifiers;
      const source = path.node.source;
      if (
        state.opts.libraryName == source.value &&
        !types.isImportDefaultSpecifier(specifiers[0])
      ) {
        const declarations = specifiers.map((specifier, index) => {
          return types.ImportDeclaration(
            [types.importDefaultSpecifier(specifier.local)],
            types.stringLiteral(`${source.value}/${specifier.local.name}`)
          );
        });
        path.replaceWithMultiple(declarations);
      }
    },
  },
};
module.exports = function (babel) {
  return {
    visitor,
  };
};
