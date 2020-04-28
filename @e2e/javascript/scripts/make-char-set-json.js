const fs = require('fs');

const inBound = ch => ch >= 0x7f && ch <= 0xffff;
const startCodes = require('unicode-12.0.0/Binary_Property/ID_Start/code-points.js').filter(inBound);

const continueFilter = val => inBound(val) && !startCodes.includes(val);
const continueCodes = require('unicode-12.0.0/Binary_Property/ID_Continue/code-points.js').filter(continueFilter);

const makeRanges = chars => {
  const ranges = [];
  const len = chars.length;
  let last;
  let min = last = chars[0];
  for (let i = 1; i < len; i++) {
    const curr = chars[i];
    if (curr - last > 1) {
      ranges.push([min, last]);
      min = curr;
    }
    last = curr;
  }

  ranges.push([min, last]);
  return ranges;
};

const startRanges = makeRanges(startCodes);
const continueRanges = makeRanges(continueCodes);

const toString = val => JSON.stringify(val);

function write(filename, data) {
  fs.writeFileSync(__dirname + `/../json-data/${filename}.json`, data, 'utf8');
}

function out() {
  write('id-start-ranges', toString(startRanges));
  write('id-continue-ranges', toString(continueRanges));
}

out();
