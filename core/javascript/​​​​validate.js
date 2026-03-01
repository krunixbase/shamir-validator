This file is part of Shamir Validator.
Copyright (C) 2026 Andrzej

Shamir Validator is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 as published
by the Free Software Foundation.

Shamir Validator is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Shamir Validator. If not, see <https://www.gnu.org/licenses/>.


const { lagrangeInterpolateZero } = require("./lagrange");

// Prime field (same as Python example)
const FIELD = 208351617316091241234326746312124448251235562226470491514186331217050270460481n;

const SECRET = 123456789n;
const THRESHOLD = 3; // t
const SHARES = 5;    // n
const SEED = 1337n;

// Simple deterministic RNG (LCG) for reproducible validation ONLY
function makeLcg(seed) {
    let state = seed % FIELD;

    return function next() {
        // LCG parameters (not cryptographic; chosen for determinism)
        state = (1103515245n * state + 12345n) % FIELD;
        return state;
    };
}

const rng = makeLcg(SEED);

// Polynomial coefficients: f(x) = a0 + a1 x + ... with a0 = SECRET
const coeffs = [SECRET];
for (let i = 1; i < THRESHOLD; i++) {
    // keep coefficients in [1, FIELD-1]
    const r = rng();
    const c = (r % (FIELD - 1n)) + 1n;
    coeffs.push(c);
}

function mod(x) {
    const r = x % FIELD;
    return r < 0n ? r + FIELD : r;
}

function poly(x) {
    let acc = 0n;
    let pow = 1n;

    for (let i = 0; i < coeffs.length; i++) {
        acc = mod(acc + mod(coeffs[i] * pow));
        pow = mod(pow * x);
    }

    return acc;
}

// Generate shares (x_i, y_i) for x=1..SHARES
const points = [];
for (let i = 1n; i <= BigInt(SHARES); i++) {
    points.push([i, poly(i)]);
}

// Use first THRESHOLD points for reconstruction demo
const subset = points.slice(0, THRESHOLD);

const recovered = lagrangeInterpolateZero(subset, FIELD);

console.log("Original secret:", SECRET.toString());
console.log("Recovered secret:", recovered.toString());
console.log("Match:", recovered === SECRET);