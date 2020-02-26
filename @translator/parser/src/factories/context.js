const readOnlyVariable = require('../../../../@core/utils/readOnlyVariable');
const tokenServiceFactory = require('./tokenService');

const mapRules = require('../lib/mapRules');

module.exports = (builder, lexerConstructor, rules, text) => {
  const tokenService = tokenServiceFactory(lexerConstructor, text);
  const context = {
    builder,
    eat: tokenService.eat,
  };
  context.rules = mapRules(rules, context),
  readOnlyVariable(context, 'currentToken', tokenService.currentToken, {
    get: () => tokenService.currentToken,
  });

  return context;
};
