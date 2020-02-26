const Builder = require('../src/builder');

describe('builder', () => {
  it('should exist', () => {
    expect(Builder).toBeDefined();
  });

  it('NumericLiteral', () => {
    expect(Builder.numericLiteral).toBeDefined();
    expect(Builder.numericLiteral).toBeInstanceOf(Function);
    expect(Builder.isNumericLiteral).toBeDefined();
    expect(Builder.isNumericLiteral).toBeInstanceOf(Function);
    expect(Builder.assertNumericLiteral).toBeDefined();
    expect(Builder.assertNumericLiteral).toBeInstanceOf(Function);
  });

  it('BinaryOperation', () => {
    expect(Builder.binaryOperation).toBeDefined();
    expect(Builder.binaryOperation).toBeInstanceOf(Function);
    expect(Builder.isBinaryOperation).toBeDefined();
    expect(Builder.isBinaryOperation).toBeInstanceOf(Function);
    expect(Builder.assertBinaryOperation).toBeDefined();
    expect(Builder.assertBinaryOperation).toBeInstanceOf(Function);
  });

  it('UnaryOperation', () => {
    expect(Builder.unaryOperation).toBeDefined();
    expect(Builder.unaryOperation).toBeInstanceOf(Function);
    expect(Builder.isUnaryOperation).toBeDefined();
    expect(Builder.isUnaryOperation).toBeInstanceOf(Function);
    expect(Builder.assertUnaryOperation).toBeDefined();
    expect(Builder.assertUnaryOperation).toBeInstanceOf(Function);
  });
});
