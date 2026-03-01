# This file is part of Shamir Validator.
# Copyright (C) 2026 Andrzej
#
# Shamir Validator is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as published
# by the Free Software Foundation.
#
# Shamir Validator is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Shamir Validator. If not, see <https://www.gnu.org/licenses/>.
#

import random
from lagrange import lagrange_interpolate_zero

FIELD = 208351617316091241234326746312124448251235562226470491514186331217050270460481
SECRET = 123456789
THRESHOLD = 3
SHARES = 5
SEED = 1337

random.seed(SEED)

coeffs = [SECRET] + [random.randrange(1, FIELD) for _ in range(THRESHOLD - 1)]

def poly(x):
    return sum(c * pow(x, i, FIELD) for i, c in enumerate(coeffs)) % FIELD

points = [(i, poly(i)) for i in range(1, SHARES + 1)]
subset = points[:THRESHOLD]

recovered = lagrange_interpolate_zero(subset, FIELD)
# For audit purposes only — do not log secrets in production

print("Original secret: [REDACTED]")
print("Recovered secret: [REDACTED]")