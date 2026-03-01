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


def lagrange_interpolate_zero(points, field):
    """
    Reconstructs f(0) using Lagrange interpolation.

    points: list of (x, y) tuples
    field: prime modulus
    """
    secret = 0

    for i, (xi, yi) in enumerate(points):
        num = 1
        den = 1

        for j, (xj, _) in enumerate(points):
            if i != j:
                num = (num * (-xj)) % field
                den = (den * (xi - xj)) % field

        inv_den = pow(den, -1, field)
        li = num * inv_den % field
        secret = (secret + yi * li) % field

    return secret