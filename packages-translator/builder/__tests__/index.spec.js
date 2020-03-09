const Builder = require('@mike/translator-classes/Builder');

const builder = require('../src');

const configValidatorMock = jest.fn();
jest.mock('../src/validations/config');
const configModule = require('../src/validations/config');
configModule.validate = configValidatorMock;

jest.mock('../src/factories/alias');
const aliasFactoryMock = require('../src/factories/alias');
jest.mock('../src/lib/composeBuilder');
const composeBuilderMock = require('../src/lib/composeBuilder');

const checkRef = () => {};
const aliasMock = jest.fn();
const mockAliasService = {
  check: checkRef,
  alias: aliasMock,
};
const field1AliasesRef = {};
const field1Ref = {
  aliases: field1AliasesRef,
};

const field2AliasesRef = {};
const field2Ref = {
  aliases: field2AliasesRef,
};
const configRef = {
  field1: field1Ref,
  field2: field2Ref,
};
const composedBuilderRef = {
  field1: field1Ref,
  field2: field2Ref,
};

describe('builder', () => {
  beforeEach(() => {
    composeBuilderMock.mockReturnValue(composedBuilderRef);
    aliasFactoryMock.mockReturnValue(mockAliasService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should be a function', () => {
    expect(builder).toBeDefined();
    expect(builder).toBeInstanceOf(Function);
  });

  it('should call the configValidatorMock', () => {
    const configRef = {};
    builder(configRef);
    expect(configValidatorMock).toHaveBeenCalledTimes(1);
    expect(configValidatorMock.mock.calls[0][0]).toEqual(configRef);
  });

  it('should call the aliasFactoryMock', () => {
    const configRef = {};
    builder(configRef);
    expect(aliasFactoryMock).toHaveBeenCalledTimes(1);
  });

  it('should call aliasMock once for each item in the field', () => {
    builder(configRef);
    expect(aliasMock).toHaveBeenCalledTimes(2);
    expect(aliasMock.mock.calls[0][0]).toEqual('field1');
    expect(aliasMock.mock.calls[0][1]).toEqual(field1AliasesRef);

    expect(aliasMock.mock.calls[1][0]).toEqual('field2');
    expect(aliasMock.mock.calls[1][1]).toEqual(field2AliasesRef);
  });

  it('should call composeBuilderMock once for each item in the field', () => {
    builder(configRef);
    expect(composeBuilderMock).toHaveBeenCalledTimes(2);
    expect(composeBuilderMock.mock.calls[0][0]).toEqual('field1');
    expect(composeBuilderMock.mock.calls[0][1]).toEqual(field1Ref);
    expect(composeBuilderMock.mock.calls[0][2]).toEqual(checkRef);

    expect(composeBuilderMock.mock.calls[1][0]).toEqual('field2');
    expect(composeBuilderMock.mock.calls[1][1]).toEqual(field2Ref);
    expect(composeBuilderMock.mock.calls[1][2]).toEqual(checkRef);
  });

  it('should return a class that extends Builder', () => {
    expect(builder(configRef).extends(Builder)).toBe(true);
  });

  it('should have the fields from the input class on the new builder', () => {
    const Builder = builder(configRef);
    expect(Builder.field1).toBeDefined();
    expect(Builder.field1).toEqual(field1Ref);
    expect(Builder.field2).toBeDefined();
    expect(Builder.field2).toEqual(field2Ref);
  });
});