const contextFactory = require('../../src/factories/context');

jest.mock('../../src/factories/tokenService');
const tokenServiceFactoryMock = require('../../src/factories/tokenService');
jest.mock('../../src/lib/mapRules');
const mapRulesMock = require('../../src/lib/mapRules');

describe('contextFactory', () => {
  const builderRef = {};
  const currentTokenRef = {};
  const lexerConstructorRef = function() {};
  const textRef = {};
  const eatRef = () => {};
  const rulesRef = {};
  const mapRulesMockReturnRef = {};

  let mockTokenService;
  let testContext;
  beforeEach(() => {
    mockTokenService = {
      currentToken: currentTokenRef,
      eat: eatRef,
    };

    tokenServiceFactoryMock.mockReturnValue(mockTokenService);
    mapRulesMock.mockReturnValue(mapRulesMockReturnRef);
    testContext = contextFactory(builderRef, lexerConstructorRef, rulesRef, textRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(contextFactory).toBeDefined();
    expect(contextFactory).toBeInstanceOf(Function);
  });

  it('should call the tokenServiceFactoryMock with the text arg', () => {
    expect(tokenServiceFactoryMock).toHaveBeenCalledTimes(1);
    expect(tokenServiceFactoryMock.mock.calls[0][0]).toEqual(lexerConstructorRef);
    expect(tokenServiceFactoryMock.mock.calls[0][1]).toEqual(textRef);
  });

  it('should call the mapRulesMock with the rules arg', () => {
    expect(mapRulesMock).toHaveBeenCalledTimes(1);
    expect(mapRulesMock.mock.calls[0][0]).toEqual(rulesRef);
    expect(mapRulesMock.mock.calls[0][1]).toEqual(testContext);
  });

  describe('returns', () => {
    it('should return an object', () => {
      expect(testContext).toBeDefined();
      expect(testContext).toBeInstanceOf(Object);
    });

    it('should have a builder prop', () => {
      expect(testContext.builder).toBeDefined();
      expect(testContext.builder).toEqual(builderRef);
    });

    it('should have an eat method', () => {
      expect(testContext.eat).toBeDefined();
      expect(testContext.eat).toEqual(eatRef);
    });

    it('should have a rules prop', () => {
      expect(testContext.rules).toBeDefined();
      expect(testContext.rules).toEqual(mapRulesMockReturnRef);
    });

    describe('currentToken', () => {
      it('should have a currentToken prop', () => {});

      it('should be read only', () => {
        expect(() => {
          testContext.currentToken = {};
        }).toThrowErrorMatchingSnapshot();
      });
    });
  });
});