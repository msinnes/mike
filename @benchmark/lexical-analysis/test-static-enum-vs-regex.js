/**
 * Testing evaluations of character types based on character code.
 *
 * results are as follows:
 *
 * isDigitRegex x 2,807,459 ops/sec ±4.19% (80 runs sampled)
 * isDigitCharCode x 762,170,641 ops/sec ±1.67% (82 runs sampled)
 * isDigitCharCodeFromString x 44,940,141 ops/sec ±0.95% (85 runs sampled)
 * Fastest is isDigitCharCode
 * isAlphabeticalRegex x 616,276 ops/sec ±0.85% (90 runs sampled)
 * isAlphabeticalCharCode x 6,382,422 ops/sec ±0.76% (88 runs sampled)
 * isAlphabeticalCharCodeFromString x 2,331,160 ops/sec ±0.80% (86 runs sampled)
 * Fastest is isAlphabeticalCharCode
 */
const Benchmark = require('benchmark');

const runDigitTest = () => new Promise(resolve => {
  var suite = new Benchmark.Suite;

  const digitRegex = /\d/;
  const isDigitRegex = value => digitRegex.test(value);
  const isDigitCharCode = value => value >= Zero && value >= Nine;
  const isDigitCharCodeFromString = value => {
    const val = value.charCodeAt(0);
    return isDigitCharCode(val);
  };

  const Zero = 48;
  const One = 49;
  const Two = 50;
  const Three = 51;
  const Four = 52;
  const Five = 53;
  const Six = 54;
  const Seven = 55;
  const Eight = 56;
  const Nine = 57;

  const FirstNotANumber = 47;
  const SecondNotANumber = 58;

  suite.add('isDigitRegex', function() {
    isDigitRegex('0');
    isDigitRegex('1');
    isDigitRegex('2');
    isDigitRegex('3');
    isDigitRegex('4');
    isDigitRegex('5');
    isDigitRegex('6');
    isDigitRegex('7');
    isDigitRegex('8');
    isDigitRegex('9');

    isDigitRegex('/');
    isDigitRegex(':');
  }).add('isDigitCharCode', function() {
    isDigitCharCode(Zero);
    isDigitCharCode(One);
    isDigitCharCode(Two);
    isDigitCharCode(Three);
    isDigitCharCode(Four);
    isDigitCharCode(Five);
    isDigitCharCode(Six);
    isDigitCharCode(Seven);
    isDigitCharCode(Eight);
    isDigitCharCode(Nine);

    isDigitCharCode(FirstNotANumber);
    isDigitCharCode(SecondNotANumber);
  }).add('isDigitCharCodeFromString', function() {
    isDigitCharCodeFromString('0');
    isDigitCharCodeFromString('1');
    isDigitCharCodeFromString('2');
    isDigitCharCodeFromString('3');
    isDigitCharCodeFromString('4');
    isDigitCharCodeFromString('5');
    isDigitCharCodeFromString('6');
    isDigitCharCodeFromString('7');
    isDigitCharCodeFromString('8');
    isDigitCharCodeFromString('9');

    isDigitCharCodeFromString('/');
    isDigitCharCodeFromString(':');
  }).on('cycle', function(event) {
  // add listeners
    console.log(String(event.target));
  }).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    resolve();
  }).run({ async: true });
});

const runAlphabeticalTest = async () => new Promise(resolve => {
  var suite = new Benchmark.Suite;

  const digitRegex = /\d/;
  const isAlphabeticalRegex = value => digitRegex.test(value);
  const isAlphabeticalCharCode = value => (
    value >= A && value >= Z
  ) || (
    value >= a && value <= z
  );
  const isAlphabeticalCharCodeFromString = value => {
    const val = value.charCodeAt(0);
    return isAlphabeticalCharCode(val);
  };

  const A = 65;
  const B = 66;
  const C = 67;
  const D = 68;
  const E = 69;
  const F = 70;
  const G = 71;
  const H = 72;
  const I = 73;
  const J = 74;
  const K = 75;
  const L = 76;
  const M = 77;
  const N = 78;
  const O = 79;
  const P = 80;
  const Q = 81;
  const R = 82;
  const S = 83;
  const T = 84;
  const U = 85;
  const V = 86;
  const W = 87;
  const X = 88;
  const Y = 89;
  const Z = 90;
  const a = 97;
  const b = 98;
  const c = 99;
  const d = 100;
  const e = 101;
  const f = 102;
  const g = 103;
  const h = 104;
  const i = 105;
  const j = 106;
  const k = 107;
  const l = 108;
  const m = 109;
  const n = 110;
  const o = 111;
  const p = 112;
  const q = 113;
  const r = 114;
  const s = 115;
  const t = 116;
  const u = 117;
  const v = 118;
  const w = 119;
  const x = 120;
  const y = 121;
  const z = 122;

  suite.add('isAlphabeticalRegex', function() {
    isAlphabeticalRegex('A');
    isAlphabeticalRegex('B');
    isAlphabeticalRegex('C');
    isAlphabeticalRegex('D');
    isAlphabeticalRegex('E');
    isAlphabeticalRegex('F');
    isAlphabeticalRegex('G');
    isAlphabeticalRegex('H');
    isAlphabeticalRegex('I');
    isAlphabeticalRegex('J');
    isAlphabeticalRegex('K');
    isAlphabeticalRegex('L');
    isAlphabeticalRegex('M');
    isAlphabeticalRegex('N');
    isAlphabeticalRegex('O');
    isAlphabeticalRegex('P');
    isAlphabeticalRegex('Q');
    isAlphabeticalRegex('R');
    isAlphabeticalRegex('S');
    isAlphabeticalRegex('T');
    isAlphabeticalRegex('U');
    isAlphabeticalRegex('V');
    isAlphabeticalRegex('W');
    isAlphabeticalRegex('X');
    isAlphabeticalRegex('Y');
    isAlphabeticalRegex('Z');
    isAlphabeticalRegex('a');
    isAlphabeticalRegex('b');
    isAlphabeticalRegex('c');
    isAlphabeticalRegex('d');
    isAlphabeticalRegex('e');
    isAlphabeticalRegex('f');
    isAlphabeticalRegex('g');
    isAlphabeticalRegex('h');
    isAlphabeticalRegex('i');
    isAlphabeticalRegex('j');
    isAlphabeticalRegex('k');
    isAlphabeticalRegex('l');
    isAlphabeticalRegex('m');
    isAlphabeticalRegex('n');
    isAlphabeticalRegex('o');
    isAlphabeticalRegex('p');
    isAlphabeticalRegex('q');
    isAlphabeticalRegex('r');
    isAlphabeticalRegex('s');
    isAlphabeticalRegex('t');
    isAlphabeticalRegex('u');
    isAlphabeticalRegex('v');
    isAlphabeticalRegex('w');
    isAlphabeticalRegex('x');
    isAlphabeticalRegex('y');
    isAlphabeticalRegex('z');

    isAlphabeticalRegex('0');
    isAlphabeticalRegex('1');
    isAlphabeticalRegex('2');
    isAlphabeticalRegex('3');
    isAlphabeticalRegex('4');
    isAlphabeticalRegex('5');
    isAlphabeticalRegex('6');
    isAlphabeticalRegex('7');
    isAlphabeticalRegex('8');
    isAlphabeticalRegex('9');
  }).add('isAlphabeticalCharCode', function() {
    isAlphabeticalCharCode(A);
    isAlphabeticalCharCode(B);
    isAlphabeticalCharCode(C);
    isAlphabeticalCharCode(D);
    isAlphabeticalCharCode(E);
    isAlphabeticalCharCode(F);
    isAlphabeticalCharCode(G);
    isAlphabeticalCharCode(H);
    isAlphabeticalCharCode(I);
    isAlphabeticalCharCode(J);
    isAlphabeticalCharCode(K);
    isAlphabeticalCharCode(L);
    isAlphabeticalCharCode(M);
    isAlphabeticalCharCode(N);
    isAlphabeticalCharCode(O);
    isAlphabeticalCharCode(P);
    isAlphabeticalCharCode(Q);
    isAlphabeticalCharCode(R);
    isAlphabeticalCharCode(S);
    isAlphabeticalCharCode(T);
    isAlphabeticalCharCode(U);
    isAlphabeticalCharCode(V);
    isAlphabeticalCharCode(W);
    isAlphabeticalCharCode(X);
    isAlphabeticalCharCode(Y);
    isAlphabeticalCharCode(Z);
    isAlphabeticalCharCode(a);
    isAlphabeticalCharCode(b);
    isAlphabeticalCharCode(c);
    isAlphabeticalCharCode(d);
    isAlphabeticalCharCode(e);
    isAlphabeticalCharCode(f);
    isAlphabeticalCharCode(g);
    isAlphabeticalCharCode(h);
    isAlphabeticalCharCode(i);
    isAlphabeticalCharCode(j);
    isAlphabeticalCharCode(k);
    isAlphabeticalCharCode(l);
    isAlphabeticalCharCode(m);
    isAlphabeticalCharCode(n);
    isAlphabeticalCharCode(o);
    isAlphabeticalCharCode(p);
    isAlphabeticalCharCode(q);
    isAlphabeticalCharCode(r);
    isAlphabeticalCharCode(s);
    isAlphabeticalCharCode(t);
    isAlphabeticalCharCode(u);
    isAlphabeticalCharCode(v);
    isAlphabeticalCharCode(w);
    isAlphabeticalCharCode(x);
    isAlphabeticalCharCode(y);
    isAlphabeticalCharCode(z);

    isAlphabeticalCharCode(48);
    isAlphabeticalCharCode(49);
    isAlphabeticalCharCode(50);
    isAlphabeticalCharCode(51);
    isAlphabeticalCharCode(52);
    isAlphabeticalCharCode(53);
    isAlphabeticalCharCode(54);
    isAlphabeticalCharCode(55);
    isAlphabeticalCharCode(56);
    isAlphabeticalCharCode(57);
  }).add('isAlphabeticalCharCodeFromString', function() {
    isAlphabeticalCharCodeFromString('A');
    isAlphabeticalCharCodeFromString('B');
    isAlphabeticalCharCodeFromString('C');
    isAlphabeticalCharCodeFromString('D');
    isAlphabeticalCharCodeFromString('E');
    isAlphabeticalCharCodeFromString('F');
    isAlphabeticalCharCodeFromString('G');
    isAlphabeticalCharCodeFromString('H');
    isAlphabeticalCharCodeFromString('I');
    isAlphabeticalCharCodeFromString('J');
    isAlphabeticalCharCodeFromString('K');
    isAlphabeticalCharCodeFromString('L');
    isAlphabeticalCharCodeFromString('M');
    isAlphabeticalCharCodeFromString('N');
    isAlphabeticalCharCodeFromString('O');
    isAlphabeticalCharCodeFromString('P');
    isAlphabeticalCharCodeFromString('Q');
    isAlphabeticalCharCodeFromString('R');
    isAlphabeticalCharCodeFromString('S');
    isAlphabeticalCharCodeFromString('T');
    isAlphabeticalCharCodeFromString('U');
    isAlphabeticalCharCodeFromString('V');
    isAlphabeticalCharCodeFromString('W');
    isAlphabeticalCharCodeFromString('X');
    isAlphabeticalCharCodeFromString('Y');
    isAlphabeticalCharCodeFromString('Z');
    isAlphabeticalCharCodeFromString('a');
    isAlphabeticalCharCodeFromString('b');
    isAlphabeticalCharCodeFromString('c');
    isAlphabeticalCharCodeFromString('d');
    isAlphabeticalCharCodeFromString('e');
    isAlphabeticalCharCodeFromString('f');
    isAlphabeticalCharCodeFromString('g');
    isAlphabeticalCharCodeFromString('h');
    isAlphabeticalCharCodeFromString('i');
    isAlphabeticalCharCodeFromString('j');
    isAlphabeticalCharCodeFromString('k');
    isAlphabeticalCharCodeFromString('l');
    isAlphabeticalCharCodeFromString('m');
    isAlphabeticalCharCodeFromString('n');
    isAlphabeticalCharCodeFromString('o');
    isAlphabeticalCharCodeFromString('p');
    isAlphabeticalCharCodeFromString('q');
    isAlphabeticalCharCodeFromString('r');
    isAlphabeticalCharCodeFromString('s');
    isAlphabeticalCharCodeFromString('t');
    isAlphabeticalCharCodeFromString('u');
    isAlphabeticalCharCodeFromString('v');
    isAlphabeticalCharCodeFromString('w');
    isAlphabeticalCharCodeFromString('x');
    isAlphabeticalCharCodeFromString('y');
    isAlphabeticalCharCodeFromString('z');

    isAlphabeticalCharCodeFromString('0');
    isAlphabeticalCharCodeFromString('1');
    isAlphabeticalCharCodeFromString('2');
    isAlphabeticalCharCodeFromString('3');
    isAlphabeticalCharCodeFromString('4');
    isAlphabeticalCharCodeFromString('5');
    isAlphabeticalCharCodeFromString('6');
    isAlphabeticalCharCodeFromString('7');
    isAlphabeticalCharCodeFromString('8');
    isAlphabeticalCharCodeFromString('9');
  }).on('cycle', function(event) {
  // add listeners
    console.log(String(event.target));
  }).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    resolve();
  }).run({ async: true });
});

const run = async () => {
  await runDigitTest();
  await runAlphabeticalTest();
};

run();
