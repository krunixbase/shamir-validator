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

function lagrangeInterpolateZero(points, field) {
    /*
     * Reconstructs f(0) using Lagrange interpolation.
     *
     * points: array of [x, y]
     * field: prime modulus
     */
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

        const invDen = BigInt(modInverse(Number(den), Number(field)));
        const li = (num * invDen) % field;
        secret = (secret + yi * li) % field;
    }

    return (secret + field) % field;
}

module.exports = {
    lagrangeInterpolateZero
};
