const { loadClass } = require('@mike/class');
const AstNode = require('@mike/translator-classes/AstNode');
const iParser = require('@mike/translator-interfaces/iParser');

const Builder = require('../Builder');
const Contextual = require('../Contextual');
const Lexer = require('../Lexer');
const Parser = require('../Parser');

const TestableParser = loadClass(function() {
  this.builder = Builder;
  this.createContext = function() {};
  this.lexer = Lexer;
  this.rootSyntaxRule = function() {};
  this.syntaxRules = {};
}).extend(Parser);

describe('Parser', () => {
  afterEach(jest.resetAllMocks);

  it('should be an abstract class', () => {
    expect(() => {
      Parser('string');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Parser('string');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should implement iParser', () => {
    expect(Parser.implements(iParser)).toBe(true);
  });

  it('should extend Contextual', () => {
    expect(TestableParser.extends(Contextual)).toBe(true);
  });

  describe('instance', () => {
    describe('instance.wrapRule', () => {
      const testRuleMock = jest.fn();
      const instance = new TestableParser();
      const contextTestValue = {};

      it('should be a function', () => {
        expect(instance.wrapRule).toBeDefined();
        expect(instance.wrapRule).toBeInstanceOf(Function);
      });

      it('should return a function', () => {
        expect(instance.wrapRule()).toBeDefined();
        expect(instance.wrapRule()).toBeInstanceOf(Function);
      });

      it('should call testRuleMock and pass contextTestValue', () => {
        testRuleMock.mockReturnValue(new AstNode('type'));
        instance.wrapRule(testRuleMock, contextTestValue)();
        expect(testRuleMock).toHaveBeenCalledTimes(1);
        expect(testRuleMock.mock.calls[0][0]).toEqual(contextTestValue);
      });

      it('should throw a runtime error if the rule does not return an AstNode', () => {
        expect(() => {
          instance.wrapRule(testRuleMock, contextTestValue)();
        }).toThrowErrorMatchingSnapshot();
      });
    });

    describe('instance.mapRules', () => {
      const wrapRuleMock = jest.fn();
      const instance = new TestableParser();
      instance.wrapRule = wrapRuleMock;

      it('should be a function', () => {
        expect(instance.mapRules).toBeDefined();
        expect(instance.mapRules).toBeInstanceOf(Function);
      });

      it('should return an object', () => {
        expect(instance.mapRules({})).toBeDefined();
        expect(instance.mapRules({})).toBeInstanceOf(Object);
      });

      it('should call the wrapRuleMock once for each rule', () => {
        const ruleOneRef = {};
        const ruleTwoRef = {};
        const rulesTestValue = {
          ruleOne: ruleOneRef,
          ruleTwo: ruleTwoRef,
        };
        const contextTestValue = {};

        const returnRef = {};
        wrapRuleMock.mockReturnValue(returnRef);

        const mappedRules = instance.mapRules(rulesTestValue, contextTestValue);
        expect(wrapRuleMock).toHaveBeenCalledTimes(2);
        expect(wrapRuleMock.mock.calls[0][0]).toEqual(ruleOneRef);
        expect(wrapRuleMock.mock.calls[0][1]).toEqual(contextTestValue);
        expect(wrapRuleMock.mock.calls[1][0]).toEqual(ruleOneRef);
        expect(wrapRuleMock.mock.calls[1][1]).toEqual(contextTestValue);

        expect(mappedRules.ruleOne).toEqual(returnRef);
        expect(mappedRules.ruleTwo).toEqual(returnRef);
      });
    });

    describe('instance.parse', () => {
      const instance = new TestableParser();
      const ObjectAssignOriginal = Object.assign;

      const wrapRuleMock = jest.fn();
      const mapRulesMock = jest.fn();
      const createContextMock = jest.fn();
      const rootSyntaxRuleMock = jest.fn();
      const ObjectAssignMock = jest.fn();

      const mappedRulesRef = {};
      const contextRef = {};
      const finalRef = {};

      instance.wrapRule = wrapRuleMock;
      instance.mapRules = mapRulesMock;
      instance.createContext = createContextMock;

      beforeEach(() => {
        mapRulesMock.mockReturnValue(mappedRulesRef);
        wrapRuleMock.mockReturnValue(rootSyntaxRuleMock);
        createContextMock.mockReturnValue(contextRef);
        rootSyntaxRuleMock.mockReturnValue(finalRef);
        Object.assign = ObjectAssignMock;
      });

      afterEach(() => {
        Object.assign = ObjectAssignOriginal;
      });

      it('should be a function', () => {
        expect(instance.parse).toBeDefined();
        expect(instance.parse).toBeInstanceOf(Function);
      });

      it('should throw an error if no test is passed in', () => {
        expect(() => {
          instance.parse('some text');
        }).not.toThrow();
        expect(() => {
          instance.parse();
        }).toThrowErrorMatchingSnapshot();
      });

      it('should call the mocks', () => {
        const result = instance.parse('some text');
        expect(wrapRuleMock).toHaveBeenCalledTimes(1);
        expect(wrapRuleMock.mock.calls[0][0]).toEqual(instance.rootSyntaxRule);
        expect(mapRulesMock).toHaveBeenCalledTimes(1);
        expect(mapRulesMock.mock.calls[0][0]).toEqual(instance.syntaxRules);
        expect(createContextMock).toHaveBeenCalledTimes(1);
        expect(createContextMock.mock.calls[0][0]).toEqual(Lexer);
        expect(createContextMock.mock.calls[0][1]).toEqual('some text');
        expect(createContextMock.mock.calls[0][2]).toEqual(Builder);
        expect(createContextMock.mock.calls[0][3]).toEqual(mappedRulesRef);
        expect(ObjectAssignMock).toHaveBeenCalledTimes(1);
        expect(ObjectAssignMock.mock.calls[0][1]).toEqual(contextRef);
        expect(rootSyntaxRuleMock).toHaveBeenCalledTimes(1);
        expect(rootSyntaxRuleMock.mock.calls[0][0]).toEqual(contextRef);

        expect(result).toEqual(finalRef);
      });
    });
  });
});