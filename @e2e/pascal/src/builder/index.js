const builderConstructor = require('@mike/builder');

module.exports = builderConstructor({
  AssignmentStatement: {
    properties: ['operator', 'left', 'right'],
    validations: {
      operator: val => val === '=',
      left: val => typeof val ==='string',
      right: ['Expression'],
    },
    aliases: ['Statement', 'Binary'],
  },
  BinaryOperation: {
    properties: ['operator', 'left', 'right'],
    validations: {
      operator: val => /[/*+-]|DIV/.test(val),
      left: ['Expression', 'Literal'],
      right: ['Expression', 'Literal'],
    },
    aliases: ['Expression', 'Binary'],
  },
  Block: {
    properties: ['declarations', 'body'],
    validations: {
      declarations: ['Array<Declaration>'],
      body: ['BlockParent'],
    },
    aliases: ['Block'],
  },
  CompoundStatement: {
    properties: ['value'],
    validations: {
      children: ['Array<Statement>'],
    },
    aliases: ['BlockParent'],
  },
  Declaration: {
    properties: ['variable', 'dataType'],
    validations: {
      variable: ['LVal'],
      dataType: ['RVal'],
    },
    aliases: ['Declaration'],
  },
  Identifier: {
    properties: ['value'],
    validations: {
      value: val => typeof val === 'string',
    },
    aliases: ['Expression', 'LVal'],
  },
  Noop: {
    properties: [],
    aliases: ['Statement', 'Expression'],
  },
  NumericLiteral: {
    properties: ['value'],
    validations: {
      value: val => typeof val === 'number',
    },
    aliases: ['Expression', 'Literal'],
  },
  ProcedureDeclaration: {
    properties: ['name', 'block'],
    validations: {
      block: ['Block'],
      name: val => typeof val === 'string',
    },
    aliases: ['Declaration'],
  },
  Program: {
    properties: ['name', 'block'],
    validations: {
      block: ['Block'],
      name: val => typeof val === 'string',
    },
    aliases: ['Program'],
  },
  Type: {
    properties: ['value'],
    validations: {
      value: val => typeof val === 'string',
    },
    aliases: ['RVal'],
  },
  UnaryOperation: {
    properties: ['operator', 'expression'],
    validations: {
      operator: val => /[+-]/.test(val),
      expression: ['Expression', 'Literal'],
    },
    aliases: ['Expression', 'Unary'],
  },
});
