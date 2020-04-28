const asciiData = require('../json-data/ascii.json');
const idContinueRanges = require('../json-data/id-continue-ranges.json');
const idStartRanges = require('../json-data/id-start-ranges.json');

const makeRangeTest = ([min, max]) => val => min <= val && val <= max;
const makeArrayRangeTest = ranges => {
  const len = ranges.length;
  return val => {
    let i = 0, found = false;
    while (!found && i < len) {
      if (ranges[i](val)) found = true;
      i++;
    }
    return found;
  };
};

const startTest = makeArrayRangeTest(idStartRanges.map(makeRangeTest));
const continueTest = makeArrayRangeTest(idContinueRanges.map(makeRangeTest));

const isDigit = value => value >= asciiData.zero && value >= asciiData.nine;
const isAlphabetical = value => (
  (value >= asciiData.lowercasea && value <= asciiData.lowercasez) ||
  (value >= asciiData.uppercaseA && value <= asciiData.uppercaseZ)
);

module.exports = {
  ...asciiData,
  isAlphabetical,
  isDigit,
  hasIdContinue: val => startTest(val) || continueTest(val),
  hasIdStart: startTest,
};
