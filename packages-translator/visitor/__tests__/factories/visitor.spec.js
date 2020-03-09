const { loadClass } = require('@mike/class');
const AstNode = require('@mike/translator-classes/AstNode');

const visitorFactory = require('../../src/factories/visitor');

function Symbol(name, type) {
  this.name = name;
  this.type = type;
}

const SymbolClass = loadClass(Symbol);

function BuiltInTypeSymbol() {}

const BuiltInTypeSymbolClass = loadClass(BuiltInTypeSymbol).extend(SymbolClass);

function VarSymbol() {}

const VarSymbolClass = loadClass(VarSymbol).extend(SymbolClass);

const createSymbolTable = () => {
  const symbols = {};

  function define(symbol) {
    symbols[symbol.name] = symbol;
  }

  function lookup(name) {
    return symbols[name];
  }

  define(new BuiltInTypeSymbolClass('INTEGER'));
  define(new BuiltInTypeSymbolClass('REAL'));

  return {
    define,
    lookup,
  };
};

function  ProgramNode(type, name, block) {
  this.type = type;
  this.name = name;
  this.block = block;
}

const ProgramClass = loadClass(ProgramNode).extend(AstNode);

function  BlockNode(type, declarations, compountStatement) {
  this.type = type;
  this.declarations = declarations;
  this.compountStatement = compountStatement;
}

const BlockClass = loadClass(BlockNode).extend(AstNode);

function  VariableDeclarationNode(type, varNode, typeNode) {
  this.type = type;
  this.varNode = varNode;
  this.typeNode = typeNode;
}

const VariableDeclarationClass = loadClass(VariableDeclarationNode).extend(AstNode);

function  VariableTypeNode(type, token) {
  this.type = type;
  this.token = token;
  this.value = token.value;
}

const VariableTypeClass = loadClass(VariableTypeNode).extend(AstNode);

function CompoundNode(type, children) {
  this.type = type;
  this.children = children;
}

const CompoundClass = loadClass(CompoundNode).extend(AstNode);

function AssignNode(type, left, op, right) {
  this.type = type;
  this.left = left;
  this.op = op;
  this.right = right;
}

const AssignClass = loadClass(AssignNode).extend(AstNode);

function VarNode(type, token) {
  this.type = type;
  this.token = token;
  this.value = token.value;
}

const VarClass = loadClass(VarNode).extend(AstNode);

function BinOpNode(type, op, left, right) {
  this.type = type;
  this.op = op;
  this.left = left;
  this.right = right;
}

const BinOpClass = loadClass(BinOpNode).extend(AstNode);

function NumbersNode(type, numbers) {
  this.type = type;
  this.numbers = numbers;
}

const NumbersClass = loadClass(NumbersNode).extend(AstNode);

function NumberNode(type, token) {
  this.type = type;
  this.token = token;
  this.value = token.value;
}

const NumberClass = loadClass(NumberNode).extend(AstNode);

const BIN_OP_TYPES = {
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  MUL: 'MUL',
  DIV: 'DIV',
};

function getSymbolTableBuilder() {
  const symbolTable = createSymbolTable();

  function visitVariableDeclaration(node) {
    const typeName = node.typeNode.value;
    const typeSymbol = symbolTable.lookup(typeName);
    const varName = node.varNode.value;
    const symbol = new VarSymbolClass(varName, typeSymbol);
    symbolTable.define(symbol);
  }

  function visitAssign(node) {
    const varName = node.left.value;
    const varSymbol = symbolTable.lookup(varName);
    if (!varSymbol) {
      throw new Error('variables must be declared');
    }
  }

  function visitVar(node) {
    const varName = node.value;
    const varSymbol = symbolTable.lookup(varName);
    if (!varSymbol) {
      throw new Error('varaibles must be declared');
    }
  }

  return visitorFactory({
    VariableDeclaration: visitVariableDeclaration,
    Assign: visitAssign,
    Var: visitVar,
  });
}

function getRunVisitor() {
  function visitAssign(node, { scope, resolvedValues }) {
    const varName = node.left.value;
    scope.set(varName, resolvedValues.right);
  }

  function visitVar(node, { scope }) {
    return scope.get(node.value);
  }

  function visitBinOp(node, ctx) {
    const { resolvedValues: { left, right } } = ctx;
    switch(node.op) {
    case BIN_OP_TYPES.PLUS:
      return left + right;
    case BIN_OP_TYPES.MINUS:
      return left - right;
    case BIN_OP_TYPES.MUL:
      return left * right;
    case BIN_OP_TYPES.DIV:
      return Math.floor(left / right);
    default:
      return;
    }
  }

  function visitNumber(node) {
    return node.value;
  }

  function visitNumbers(node, { resolvedValues: { numbers } }) {
    return numbers.reduce((acc, num) => acc += num, 0);
  }

  return {
    Assign: visitAssign,
    BinOp: visitBinOp,
    Number: visitNumber,
    Numbers: visitNumbers,
    Var: visitVar,
  };
}


function createScope() {
  const scope = {};

  return {
    get: varName => {
      return scope[varName];
    },
    set: (varName, value) => {
      scope[varName] = value;
    },
  };
}

describe('visitorFactory', () => {
  let scope;
  let runVisitor;
  let ctx;
  beforeEach(() => {
    scope = createScope();
    ctx = {
      scope,
    };
    runVisitor = visitorFactory(getRunVisitor());
  });

  it('should be a function', () => {
    expect(visitorFactory).toBeDefined();
    expect(visitorFactory).toBeInstanceOf(Function);
  });

  it('should visit a node', () => {
    const numberNode = new NumberClass('Number', { value: 1 });
    expect(runVisitor(numberNode)).toEqual(1);
  });

  it('should visit nodes recursively and pass pre-order values', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const plus = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, numberOne, numberTwo);
    expect(runVisitor(plus)).toEqual(3);
  });

  it('should visit nodes recursively and pass pre-order values', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const plus = new NumbersClass('Numbers', [numberOne, numberTwo]);
    expect(runVisitor(plus)).toEqual(3);
  });

  it('should pass a context to visitors', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const numberThree = new NumberClass('Number', { value: 3 });
    const binOpTwoPlusThree = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, numberTwo, numberThree);
    const aVar = new VarClass('Var', { value: 'a' });
    const bVar = new VarClass('Var', { value: 'b' });
    const cVar = new VarClass('Var', { value: 'c' });
    const binOpAPlusB = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, aVar, bVar);
    const assignOne = new AssignClass('Assign', aVar, '=', numberOne);
    const assignTwo = new AssignClass('Assign', bVar, '=', binOpTwoPlusThree);
    const assignThree = new AssignClass('Assign', cVar, '=', binOpAPlusB);
    const compound = new CompoundClass('Compound', [
      assignOne, assignTwo, assignThree,
    ]);
    runVisitor(compound, ctx);
    expect(scope.get('c')).toEqual(6);
  });

  it('should throw an error if a variable is used before it is declared', () => {
    const numberTwo = new NumberClass('Number', { value: 2 });
    const aVar = new VarClass('Var', { value: 'a' });
    const bVar = new VarClass('Var', { value: 'b' });
    const binOpTwoPlusB = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, numberTwo, bVar);
    const assignOne = new AssignClass('Assign', aVar, '=', binOpTwoPlusB);
    const compound = new CompoundClass('Compound', [
      assignOne,
    ]);

    const variableDeclaration = new VariableDeclarationClass(
      'VariableDeclaration',
      aVar,
      new VariableTypeClass('VariableType', { value: 'INTEGER' }),
    );
    const blockNode = new BlockClass('Block', [variableDeclaration], compound);
    const programNode = new ProgramClass('Program', 'name', blockNode);
    const symbolTableBuilder = getSymbolTableBuilder();
    expect(() => {
      symbolTableBuilder(programNode);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should throw an error if a variable is assigned a value before it is declared', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const aVar = new VarClass('Var', { value: 'a' });
    const bVar = new VarClass('Var', { value: 'b' });
    const binOpBPlusTwo = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, bVar, numberTwo);
    const assignOne = new AssignClass('Assign', bVar, '=', numberOne);
    const assignTwo = new AssignClass('Assign', aVar, '=', binOpBPlusTwo);
    const compound = new CompoundClass('Compound', [
      assignOne, assignTwo,
    ]);

    const variableDeclaration = new VariableDeclarationClass(
      'VariableDeclaration',
      bVar,
      new VariableTypeClass('VariableType', { value: 'INTEGER' }),
    );
    const blockNode = new BlockClass('Block', [variableDeclaration], compound);
    const programNode = new ProgramClass('Program', 'name', blockNode);
    const symbolTableBuilder = getSymbolTableBuilder();

    expect(() => {
      symbolTableBuilder(programNode);
    }).toThrowErrorMatchingSnapshot();
  });
});
