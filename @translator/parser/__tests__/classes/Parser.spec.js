const { loadClass, isClass } = require('@mike/class');
const BaseParser = require('@shared/classes/BaseParser');

jest.mock('../../src/factories/context');
const contextFactoryMock = require('../../src/factories/context');
jest.mock('../../src/lib/wrapRule');
const wrapRuleMock = require('../../src/lib/wrapRule');
const textRuntimeValidation = require('../../src/validations/textRuntime');

const textRuntimeValidateMock = jest.fn();
textRuntimeValidation.validate = textRuntimeValidateMock;

const Parser = require('../../src/classes/Parser');

describe('Parser', () => {
  function EmptyClass() {}
  const contextFactoryMockReturnRef = {};
  const wrapRuleMockReturnRef = jest.fn();
  const createContextRef = jest.fn();
  const contextRef = {};

  let BareParser, instance;
  beforeEach(() => {
    BareParser = loadClass(EmptyClass).extend(Parser);
    instance = new BareParser();
    instance._createContext = createContextRef;
    contextFactoryMock.mockReturnValue(contextFactoryMockReturnRef);
    wrapRuleMock.mockReturnValue(wrapRuleMockReturnRef);
    createContextRef.mockReturnValue(contextRef);
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be an abstract class', () => {
    expect(() => {
      Parser();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      new Parser();
    }).toThrowErrorMatchingSnapshot();
    expect(isClass(Parser)).toBe(true);
  });

  it('should extend BaseParser', () => {
    expect(Parser.extends(BaseParser)).toBe(true);
  });

  it('should set the unsafe class props', () => {
    expect(instance._lexer).toBeDefined();
    expect(instance._lexer).toMatchObject({});
    expect(instance._builder).toBeDefined();
    expect(instance._builder).toMatchObject({});
    expect(instance._syntaxRules).toBeDefined();
    expect(instance._syntaxRules).toMatchObject({});
    expect(instance._syntaxRules).toBeDefined();
    expect(instance._rootSyntaxRule).toBeInstanceOf(Function);
  });

  describe('instance._createContext', () => {
    it('should be a function', () => {
      const localInstance = new BareParser();
      expect(localInstance._createContext).toBeDefined();
      expect(localInstance._createContext).toBeInstanceOf(Function);
    });

    it('should call contextFactory mock with the right args', () => {
      const textRef = 'text';
      const localInstance = new BareParser();
      localInstance._createContext(textRef);
      expect(contextFactoryMock).toHaveBeenCalledTimes(1);
      expect(contextFactoryMock.mock.calls[0][0]).toEqual(localInstance._builder);
      expect(contextFactoryMock.mock.calls[0][1]).toEqual(localInstance._lexer);
      expect(contextFactoryMock.mock.calls[0][2]).toEqual(localInstance._syntaxRules);
      expect(contextFactoryMock.mock.calls[0][3]).toEqual(textRef);
    });

    it('should return a context', () => {
      expect(instance._createContext('test')).toEqual(contextFactoryMockReturnRef);
    });
  });

  describe('instance.parse', () => {
    it('should be a function', () => {
      expect(instance.parse).toBeDefined();
      expect(instance.parse).toBeInstanceOf(Function);
    });

    it('should call textRuntime mock with the right args', () => {
      const textRef = 'text';
      instance.parse(textRef);
      expect(textRuntimeValidateMock).toHaveBeenCalledTimes(1);
    });

    it('should call instance._createContext with the right args', () => {
      const textRef = 'text';
      instance.parse(textRef);
      expect(createContextRef).toHaveBeenCalledTimes(1);
      expect(createContextRef.mock.calls[0][0]).toEqual(textRef);
    });

    it('should call wrapRuleMock with the right args', () => {
      instance.parse('text');
      expect(wrapRuleMock).toHaveBeenCalledTimes(1);
      expect(wrapRuleMock.mock.calls[0][0]).toEqual(instance._rootSyntaxRule);
      expect(wrapRuleMock.mock.calls[0][1]).toEqual(contextRef);
    });

    it('should call the wrappedRootSyntaxRule with the right args', () => {
      instance.parse('text');
      expect(wrapRuleMockReturnRef).toHaveBeenCalledTimes(1);
      expect(wrapRuleMockReturnRef.mock.calls[0][0]).toEqual(contextRef);
    });
  });
});
