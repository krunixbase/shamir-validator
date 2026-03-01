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
