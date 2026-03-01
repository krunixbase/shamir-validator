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


function modInverse(a, field) {
    // Modular inverse using extended Euclidean algorithm
    let t = 0, newT = 1;
    let r = field, newR = ((a % field) + field) % field;

    while (newR !== 0) {
        const q = Math.floor(r / newR);
        [t, newT] = [newT, t - q * newT];
        [r, newR] = [newR, r - q * newR];
    }

    if (r > 1) {
        throw new Error("Element has no modular inverse");
    }

    if (t < 0) {
        t += field;
    }

    return t;
}

(Apply GPL-3.0 license headers across the project)
function lagrangeInterpolateZero(points, field) {
    let secret = 0n;

    for (let i = 0; i < points.length; i++) {
        const [xi, yi] = points[i];
        let num = 1n;
        let den = 1n;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const [xj] = points[j];
                num = (num * (-xj)) % field;
                den = (den * (xi - xj)) % field;
            }
        }

        const invDen = modInverseBigInt(den, field);
        const li = (num * invDen) % field;
        secret = (secret + yi * li) % field;
    }

    return (secret + field) % field;
}

module.exports = {
    lagrangeInterpolateZero
};
