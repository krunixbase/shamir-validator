// test_shamir.js
// PR-ready test suite for Shamir Secret Sharing
// Run with: npx mocha test_shamir.js
// or:       jest test_shamir.js

const assert = require("assert");

// --- core functions ---

function egcd(a, b) {
  if (b === 0) return [1, 0, a];
  const [x, y, g] = egcd(b, a % b);
  return [y, x - Math.floor(a / b) * y, g];
}

function invMod(a, p) {
  a = ((a % p) + p) % p;
  const [x, , g] = egcd(a, p);
  if (g !== 1) throw new Error("No inverse");
  return (x % p + p) % p;
}

function lagrangeAtZero(xs, ys, p) {
  const t = xs.length;
  let S = 0n;
  for (let i = 0; i < t; i++) {
    let num = 1n, den = 1n;
    for (let j = 0; j < t; j++) {
      if (i === j) continue;
      num = (num * (-xs[j] % p + p)) % p;
      den = (den * ((xs[i] - xs[j] + p) % p)) % p;
    }
    const li0 = (num * invMod(den, p)) % p;
    S = (S + ys[i] * li0) % p;
  }
  return S;
}

function randomPoly(secret, t, p, rng) {
  const coeffs = [secret];
  for (let i = 1; i < t; i++) {
    coeffs.push(BigInt(rng.nextInt(p)));
  }
  return coeffs;
}

function evalPoly(coeffs, x, p) {
  let y = 0n;
  let powx = 1n;
  for (const c of coeffs) {
    y = (y + c * powx) % p;
    powx = (powx * x) % p;
  }
  return y;
}

function shares(secret, t, n, p, rng) {
  const coeffs = randomPoly(secret, t, p, rng);
  const xs = [], ys = [];
  for (let i = 1; i <= n; i++) {
    const x = BigInt(i);
    xs.push(x);
    ys.push(evalPoly(coeffs, x, p));
  }
  return [xs, ys];
}

// --- deterministic RNG with seed ---
class SeededRNG {
  constructor(seed) {
    this.state = seed >>> 0;
  }
  next() {
    // xorshift32
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state;
  }
  nextInt(mod) {
    return BigInt(this.next() % Number(mod));
  }
}

// --- tests ---
describe("Shamir Secret Sharing (deterministic, seeded)", function () {
  const SEED = 1337;
  const P = (1n << 127n) - 1n; // large prime

  it("reconstructs secret with exact threshold", function () {
    const rng = new SeededRNG(SEED);
    const secret = BigInt(rng.nextInt(P));
    const [xs, ys] = shares(secret, 3, 5, P, rng);
    const rec = lagrangeAtZero(xs.slice(0, 3), ys.slice(0, 3), P);
    assert.strictEqual(rec, secret);
  });

  it("reconstructs secret with random subsets", function () {
    const rng = new SeededRNG(SEED);
    const secret = BigInt(rng.nextInt(P));
    const [xs, ys] = shares(secret, 4, 6, P, rng);
    const combos = [
      [0,1,2,3],
      [1,2,3,4],
      [2,3,4,5]
    ];
    for (const idx of combos) {
      const subX = idx.map(i => xs[i]);
      const subY = idx.map(i => ys[i]);
      const rec = lagrangeAtZero(subX, subY, P);
      assert.strictEqual(rec, secret);
    }
  });

  it("fails to reconstruct secret when a share is tampered", function () {
    const rng = new SeededRNG(SEED);
    const secret = BigInt(rng.nextInt(P));
    const [xs, ys] = shares(secret, 4, 6, P, rng);

    // Take a valid threshold-sized subset
    const subset = [0, 1, 2, 3];
    const subX = subset.map(i => xs[i]);
    const subY = subset.map(i => ys[i]);

    // Tamper with one share in the subset
    const tamperedSubY = subY.slice();
    tamperedSubY[0] = (tamperedSubY[0] + 1n) % P;

    const rec = lagrangeAtZero(subX, tamperedSubY, P);

    // With a tampered share, reconstruction should not yield the original secret
    assert.notStrictEqual(rec, secret);
  });

  it("detects duplicate x values", function () {
    const rng = new SeededRNG(SEED);
    const secret = BigInt(rng.nextInt(P));
    const [xs, ys] = shares(secret, 3, 3, P, rng);
    xs[1] = xs[0]; // force duplicate
    // We only assert that an error is thrown, without coupling to the internal error message.
    assert.throws(() => lagrangeAtZero(xs, ys, P));
  });
});

