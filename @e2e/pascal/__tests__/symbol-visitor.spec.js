const { loadClass } = require('@mike/class');
const AstNode = require('@mike/translator-classes/AstNode');

const Visitor = require('@mike/translator-classes/Visitor');
const VisitorContext = require('@mike/translator-classes/VisitorContext');

const TestableVisitorContext = loadClass(function() {}).extend(VisitorContext);
const TestableVisitor = loadClass(function() {
  this.ContextClass = TestableVisitorContext;
}).extend(Visitor);

function Symbol(name, type) {
  this.name = name;
  this.type = type;
}

const SymbolClass = loadClass(Symbol);

function BuiltInTypeSymbol() {}

const BuiltInTypeSymbolClass = loadClass(BuiltInTypeSymbol).extend(SymbolClass);

function VarSymbol() {}

const VarSymbolClass = loadClass(VarSymbol).extend(SymbolClass);

function SymbolTable() {
  this.symbols = {};

  this.define(new BuiltInTypeSymbolClass('INTEGER'));
  this.define(new BuiltInTypeSymbolClass('REAL'));
}

SymbolTable.prototype.define = function(symbol) {
  this.symbols[symbol.name] = symbol;
};

SymbolTable.prototype.lookup = function(name) {
  return this.symbols[name];
};

const SymbolTableClass = loadClass(SymbolTable);

function ScopedSymbolTable(name, level) {
  this.name = name;
  this.level = level;
}

const ScopedSymbolTableClass = loadClass(ScopedSymbolTable).extend(SymbolTableClass);

const createSymbolTable = () => {
  return new ScopedSymbolTableClass('name', 1);
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

  return new TestableVisitor({
    VariableDeclaration: visitVariableDeclaration,
    Assign: visitAssign,
    Var: visitVar,
  });
}

describe('Visitor', () => {
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
