const { loadClass } = require('@mike/class');
const AstNode = require('@mike/translator-classes/AstNode');

const Visitor = require('@mike/translator-classes/Visitor');
const VisitorContext = require('@mike/translator-classes/VisitorContext');

const TestableVisitorContext = loadClass(function() {}).extend(VisitorContext);
const TestableVisitor = loadClass(function() {
  this.ContextClass = TestableVisitorContext;
}).extend(Visitor);

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

describe('Visitor', () => {
  let scope;
  let runVisitor;
  beforeEach(() => {
    scope = createScope();
    runVisitor = new TestableVisitor(getRunVisitor());
  });

  it('should be a function', () => {
    expect(Visitor).toBeDefined();
    expect(Visitor).toBeInstanceOf(Function);
  });

  it('should visit a node', () => {
    const numberNode = new NumberClass('Number', { value: 1 });
    expect(runVisitor.visit(numberNode)).toEqual(1);
  });

  it('should visit nodes recursively and pass pre-order values', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const plus = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, numberOne, numberTwo);
    expect(runVisitor.visit(plus)).toEqual(3);
  });

  it('should visit nodes recursively and pass pre-order values', () => {
    const numberOne = new NumberClass('Number', { value: 1 });
    const numberTwo = new NumberClass('Number', { value: 2 });
    const plus = new NumbersClass('Numbers', [numberOne, numberTwo]);
    expect(runVisitor.visit(plus)).toEqual(3);
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
    const contextMock = jest.fn();
    runVisitor.createContext = contextMock;
    contextMock.mockReturnValue({ scope });
    runVisitor.visit(compound);
    expect(scope.get('c')).toEqual(6);
  });
});
