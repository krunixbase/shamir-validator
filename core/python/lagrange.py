def lagrange_at_zero(points, p):
    secret = 0
    for i, (xi, yi) in enumerate(points):
        num = 1
        den = 1
        for j, (xj, _) in enumerate(points):
            if i != j:
                num = (num * (-xj)) % p
                den = (den * (xi - xj)) % p
        inv_den = pow(den, -1, p)
        secret = (secret + yi * num * inv_den) % p
    return secret
