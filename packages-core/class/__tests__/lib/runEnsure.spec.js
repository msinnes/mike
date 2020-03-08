const isString = require('@mike/utils/isString');

const Class = require('../../src');
const runEnsure = require('../../src/lib/runEnsure');

jest.mock('../../src/interface/ensure');
const ensureMock = require('../../src/interface/ensure');

const iNamedConfig = {
  name: Class.loadType('string', isString),
};
const iNamed = Class.loadInterface(iNamedConfig);
const BaseAbstract = Class.loadAbstractClass(function() {}).implement(iNamed);
const NamedClass = Class.loadClass(function () {this.name = 'name';}).extend(BaseAbstract);
const ExtendsNamedClass = Class.loadClass(function () {this.name = {};}).extend(NamedClass);

const namedInstance = new NamedClass();
const extendsNamedInstance = new ExtendsNamedClass();

describe('runEnsure', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should be a function', () => {
    expect(runEnsure).toBeInstanceOf(Function);
  });

  it('should only run if the passed instance was created from the passed constructor', () => {
    runEnsure(namedInstance, ExtendsNamedClass);
    expect(ensureMock).not.toHaveBeenCalled();
  });

  it('should run the ensure function for all interaces along the classProp chain', () => {
    runEnsure(extendsNamedInstance, ExtendsNamedClass);
    expect(ensureMock).toHaveBeenCalledTimes(1);
    expect(ensureMock.mock.calls[0][0]).toEqual(extendsNamedInstance);
    expect(ensureMock.mock.calls[0][1]).toEqual(iNamedConfig);
  });
});
