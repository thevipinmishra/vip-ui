import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const ts = createRequire(import.meta.url)("typescript5");

const root = path.resolve(import.meta.dirname, "..");
const outputFile = "src/lib/component-api.generated.json";
const sourceFiles = [
  "src/lib/component-api.ts",
  "src/components/charts/chart-documentation.tsx",
];

const config = ts.readConfigFile(
  path.join(root, "tsconfig.json"),
  ts.sys.readFile,
);
const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(
  sourceFiles.map((file) => path.join(root, file)),
  { ...options, incremental: false, plugins: [] },
);
const checker = program.getTypeChecker();

const literalFlags =
  ts.TypeFlags.StringLiteral |
  ts.TypeFlags.NumberLiteral |
  ts.TypeFlags.BooleanLiteral |
  ts.TypeFlags.Null;

function declarationOf(symbol) {
  return symbol?.valueDeclaration ?? symbol?.declarations?.[0];
}

function declaredTypeNode(symbol) {
  const declaration = declarationOf(symbol);
  if (declaration && "type" in declaration) return declaration.type;
}

function isZagType(symbol) {
  return symbol?.declarations?.some((declaration) =>
    declaration.getSourceFile().fileName.includes("node_modules/@zag-js/"),
  );
}

function literalUnion(type) {
  if (!type.isUnion()) return;
  const members = type.types.filter(
    (member) => !(member.flags & ts.TypeFlags.Undefined),
  );
  if (!members.every((member) => member.flags & literalFlags)) return;
  const isBoolean = (member) => member.flags & ts.TypeFlags.BooleanLiteral;
  const printed = members
    .filter((member) => !isBoolean(member))
    .map((member) => checker.typeToString(member));
  const booleans = members.filter(isBoolean);
  if (booleans.length === 2) printed.push("boolean");
  else printed.push(...booleans.map((member) => checker.typeToString(member)));
  return printed.join(" | ");
}

function expandObject(type, depth) {
  if (depth > 1 || !(type.flags & ts.TypeFlags.Object) || type.isUnion())
    return;
  if (type.getCallSignatures().length) return;
  const properties = checker.getPropertiesOfType(type);
  if (!properties.length || properties.length > 4) return;
  const members = properties.map((property) => {
    const optional = property.flags & ts.SymbolFlags.Optional ? "?" : "";
    const node = declaredTypeNode(property);
    const text = node
      ? printType(node, depth + 1)
      : checker.typeToString(checker.getTypeOfSymbol(property));
    return `${property.name}${optional}: ${text}`;
  });
  return `{ ${members.join("; ")} }`;
}

function qualifiedName(name) {
  const right = name.right.text;
  if (right !== "Api") return right;
  const left = name.left.getText();
  return `${left[0].toUpperCase()}${left.slice(1)}${right}`;
}

function isTypeParameter(node) {
  if (
    ts.isTypeReferenceNode(node) &&
    node.typeName.getText() === "NoInfer" &&
    node.typeArguments?.[0]
  )
    return isTypeParameter(node.typeArguments[0]);
  return !!(
    checker.getTypeFromTypeNode(node).flags & ts.TypeFlags.TypeParameter
  );
}

function printReference(node, depth) {
  const type = checker.getTypeFromTypeNode(node);
  const alias = type.aliasSymbol ?? checker.getSymbolAtLocation(node.typeName);
  const aliasNode = declarationOf(
    alias && alias.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(alias)
      : alias,
  );
  if (
    aliasNode &&
    ts.isTypeAliasDeclaration(aliasNode) &&
    ts.isUnionTypeNode(aliasNode.type) &&
    literalUnion(type)
  )
    return printType(aliasNode.type, depth);
  const union = literalUnion(type);
  if (union) return union;
  if (isZagType(type.aliasSymbol ?? type.getSymbol())) {
    const expanded = expandObject(type, depth);
    if (expanded) return expanded;
  }
  const name = ts.isQualifiedName(node.typeName)
    ? qualifiedName(node.typeName)
    : node.typeName.text;
  const args = (node.typeArguments ?? [])
    .filter((arg) => !isTypeParameter(arg))
    .map((arg) => printType(arg, depth));
  return args.length ? `${name}<${args.join(", ")}>` : name;
}

function printIndexedAccess(node, depth) {
  const index = node.indexType;
  if (
    ts.isLiteralTypeNode(index) &&
    ts.isStringLiteral(index.literal) &&
    ts.isTypeReferenceNode(node.objectType)
  ) {
    const objectType = checker.getTypeFromTypeNode(node.objectType);
    const property = checker.getPropertyOfType(objectType, index.literal.text);
    const propertyNode = declaredTypeNode(property);
    if (propertyNode) return printType(propertyNode, depth);
  }
  const union = literalUnion(checker.getTypeFromTypeNode(node));
  return union ?? node.getText();
}

function printType(node, depth = 0) {
  if (ts.isParenthesizedTypeNode(node)) return printType(node.type, depth);
  if (ts.isUnionTypeNode(node)) {
    const members = node.types.filter(
      (member) => member.kind !== ts.SyntaxKind.UndefinedKeyword,
    );
    if (members.length === 1) return printType(members[0], depth);
    return members
      .map((member) => {
        let inner = member;
        while (ts.isParenthesizedTypeNode(inner)) inner = inner.type;
        const text = printType(inner, depth);
        return ts.isFunctionTypeNode(inner) ? `(${text})` : text;
      })
      .join(" | ");
  }
  if (ts.isFunctionTypeNode(node)) {
    const params = node.parameters.map((param) => {
      const optional = param.questionToken ? "?" : "";
      const text = param.type ? printType(param.type, depth) : "unknown";
      return `${param.name.getText()}${optional}: ${text}`;
    });
    return `(${params.join(", ")}) => ${printType(node.type, depth)}`;
  }
  if (ts.isArrayTypeNode(node)) {
    const inner = printType(node.elementType, depth);
    return /[|=]/.test(inner) ? `(${inner})[]` : `${inner}[]`;
  }
  if (
    ts.isTypeOperatorNode(node) &&
    node.operator === ts.SyntaxKind.KeyOfKeyword
  ) {
    const union = literalUnion(checker.getTypeFromTypeNode(node));
    if (union) return union;
  }
  if (ts.isTypeOperatorNode(node))
    return `${ts.tokenToString(node.operator)} ${printType(node.type, depth)}`;
  if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal))
    return JSON.stringify(node.literal.text);
  if (ts.isTypeReferenceNode(node)) return printReference(node, depth);
  if (ts.isIndexedAccessTypeNode(node)) return printIndexedAccess(node, depth);
  return node
    .getText()
    .replace(/'([^'"]*)'/g, '"$1"')
    .replace(/\s+/g, " ")
    .replace(/;? \}/g, " }");
}

function componentFunction(typeNode) {
  if (!ts.isTypeQueryNode(typeNode)) return;
  let symbol = checker.getSymbolAtLocation(typeNode.exprName);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias)
    symbol = checker.getAliasedSymbol(symbol);
  const declaration = declarationOf(symbol);
  if (!declaration) return;
  if (ts.isFunctionDeclaration(declaration)) return declaration;
  if (ts.isVariableDeclaration(declaration) && declaration.initializer) {
    let init = declaration.initializer;
    while (ts.isCallExpression(init) && init.arguments[0])
      init = init.arguments[0];
    if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) return init;
  }
}

function isPlainValue(node) {
  if (
    ts.isStringLiteral(node) ||
    ts.isNumericLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword ||
    node.kind === ts.SyntaxKind.NullKeyword
  )
    return true;
  if (ts.isPrefixUnaryExpression(node)) return isPlainValue(node.operand);
  if (ts.isArrayLiteralExpression(node))
    return node.elements.every(isPlainValue);
  return false;
}

function destructuredDefaults(fn) {
  const defaults = new Map();
  const param = fn?.parameters[0];
  if (!param) return defaults;
  const collect = (pattern) => {
    for (const element of pattern.elements) {
      if (!element.initializer || !isPlainValue(element.initializer)) continue;
      const key = (element.propertyName ?? element.name).getText();
      const value = element.initializer.getText().replaceAll("'", '"');
      defaults.set(key, value);
    }
  };
  if (ts.isObjectBindingPattern(param.name)) collect(param.name);
  else if (ts.isIdentifier(param.name) && fn.body) {
    const visit = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isObjectBindingPattern(node.name) &&
        node.initializer &&
        ts.isIdentifier(node.initializer) &&
        node.initializer.text === param.name.text
      )
        collect(node.name);
      ts.forEachChild(node, visit);
    };
    visit(fn.body);
  }
  return defaults;
}

function propsTypeOf(type) {
  const signature = type.getCallSignatures()[0];
  const param = signature?.getParameters()[0];
  return param ? checker.getTypeOfSymbol(param) : type;
}

function objectProperty(literal, key) {
  return literal.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && property.name.getText() === key,
  )?.initializer;
}

export function readApiParts() {
  const parts = [];
  for (const file of sourceFiles) {
    const source = program.getSourceFile(path.join(root, file));
    const visit = (node) => {
      if (
        ts.isCallExpression(node) &&
        node.expression.getText() === "apiPart" &&
        node.typeArguments?.[0] &&
        node.arguments[0] &&
        ts.isObjectLiteralExpression(node.arguments[0])
      ) {
        const typeNode = node.typeArguments[0];
        const propsType = propsTypeOf(checker.getTypeFromTypeNode(typeNode));
        const defaults = destructuredDefaults(componentFunction(typeNode));
        const literal = node.arguments[0];
        const props = objectProperty(literal, "props").elements.map(
          (element) => {
            const name = objectProperty(element, "name").text;
            const hand = Object.fromEntries(
              ["type", "default", "required"].flatMap((key) => {
                const value = objectProperty(element, key);
                return value ? [[key, value]] : [];
              }),
            );
            const symbol = checker.getPropertyOfType(propsType, name);
            if (!symbol) return { name, hand };
            const typeNode = declaredTypeNode(symbol);
            const generated = {
              type: typeNode
                ? printType(typeNode)
                : checker.typeToString(
                    checker.getNonNullableType(checker.getTypeOfSymbol(symbol)),
                  ),
            };
            if (!(symbol.flags & ts.SymbolFlags.Optional))
              generated.required = true;
            if (defaults.has(name)) generated.default = defaults.get(name);
            return { name, hand, generated };
          },
        );
        parts.push({ file, name: objectProperty(literal, "name").text, props });
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return parts;
}

export function buildGenerated(parts) {
  const output = {};
  for (const part of parts) {
    if (output[part.name]) throw new Error(`Duplicate API part ${part.name}`);
    output[part.name] = Object.fromEntries(
      part.props.flatMap((prop) =>
        prop.generated ? [[prop.name, prop.generated]] : [],
      ),
    );
  }
  return output;
}

export function redundantOverrides(parts) {
  const redundant = [];
  for (const part of parts) {
    for (const prop of part.props) {
      if (!prop.generated) continue;
      for (const [key, node] of Object.entries(prop.hand)) {
        const value = key === "required" ? true : node.text;
        if (prop.generated[key] === value)
          redundant.push(`${part.name}.${prop.name}.${key}`);
      }
    }
  }
  return redundant;
}

if (import.meta.main) {
  const parts = readApiParts();
  const generated = buildGenerated(parts);
  const file = path.join(root, outputFile);
  if (process.argv.includes("--check")) {
    const current = JSON.parse(await readFile(file, "utf8"));
    if (JSON.stringify(current) !== JSON.stringify(generated)) {
      console.error(`${outputFile} is stale. Run pnpm api:build.`);
      process.exit(1);
    }
  } else {
    await writeFile(file, `${JSON.stringify(generated, null, 2)}\n`);
  }
}
