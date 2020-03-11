const { loadClass } = require('@mike/class');
const AstNode = require('@mike/translator-classes/AstNode');

const Contextual = require('../Contextual');
const Visitor = require('../Visitor');
const VisitorContext = require('../VisitorContext');

const TestableVisitorContext = loadClass(function() {}).extend(VisitorContext);

const BIN_OP_TYPES = {
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  MUL: 'MUL',
  DIV: 'DIV',
};

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

const visitorConfig = {
  BinOp: visitBinOp,
  Number: visitNumber,
};

const TestableVisitor = loadClass(function() {
  this.ContextClass = TestableVisitorContext;
}).extend(Visitor);

describe('Visitor', () => {
  let instance;
  let createContextMock;
  const field1Ref = {};
  const field2Ref = {};
  let mockContext = {
    fiedl1: field1Ref,
    field2: field2Ref,
  };
  beforeEach(() => {
    instance = new TestableVisitor(visitorConfig);
    createContextMock = jest.fn();
    instance.createContext = createContextMock;
    createContextMock.mockReturnValue(mockContext);
  });

  afterEach(() => jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(() => {
      Visitor();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Visitor();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should extend Contextual', () => {
    expect(TestableVisitor.extends(Contextual)).toBe(true);
  });

  describe('instance', () => {
    it('should set the visitor prop', () => {
      expect(instance.visitor).toBeInstanceOf(Function);
    });

    describe('instance.visit', () => {
      it('should be a function', () => {
        expect(instance.visit).toBeInstanceOf(Function);
      });

      it('should call the createContextMock', () => {
        const numberNode = new NumberClass('Number', { value: 1 });
        instance.visit(numberNode);
        expect(createContextMock).toHaveBeenCalledTimes(1);
      });

      it('should call a visitor mock', () => {
        const numberNode = new NumberClass('Number', { value: 1 });
        const visitorMock = jest.fn();
        const returnRef = {};
        instance.visitor = visitorMock;
        visitorMock.mockReturnValue(returnRef);
        const result = instance.visit(numberNode);
        expect(visitorMock).toHaveBeenCalledTimes(1);
        expect(visitorMock).toHaveBeenCalledWith(numberNode, mockContext);
        expect(result).toEqual(returnRef);
      });

      it('should visit a node', () => {
        const numberNode = new NumberClass('Number', { value: 1 });
        expect(instance.visit(numberNode)).toEqual(1);
      });

      it('should visit nodes recursively and pass pre-order values', () => {
        const numberOne = new NumberClass('Number', { value: 1 });
        const numberTwo = new NumberClass('Number', { value: 2 });
        const plus = new BinOpClass('BinOp', BIN_OP_TYPES.PLUS, numberOne, numberTwo);
        expect(instance.visit(plus)).toEqual(3);
      });
    });
  });
});