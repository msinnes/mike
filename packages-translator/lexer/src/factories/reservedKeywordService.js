const Token = require('@mike/translator-classes/Token');

const getValueResolver = caseSensitive => caseSensitive ? val => val : val => val.toUpperCase();

module.exports = (reservedKeywords, caseSensitive = true) => {
  const valueResolver = getValueResolver(caseSensitive);
  const mappedKeywordArray = [];
  const keywordTokenMap = reservedKeywords.reduce((acc, value) => {
    const resolvedValue = valueResolver(value);
    mappedKeywordArray.push(resolvedValue);
    acc[resolvedValue] = new Token(resolvedValue, resolvedValue);
    return acc;
  }, {});

  return {
    getReservedToken: value => keywordTokenMap[valueResolver(value)],
    isReservedKeyword: value => mappedKeywordArray.indexOf(valueResolver(value)) >= 0,
  };
};
