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


// SPDX-License-Identifier: GPL-3.0-only

import assert from 'assert';
import { split, combine } from '../src/shamir.js';

describe('Share permutation invariance', () => {
  it('reconstructs the secret regardless of share order', () => {
    const secret = 987654;
    const threshold = 3;
    const shares = 5;

    const generatedShares = split(secret, shares, threshold, {
      deterministic: true,
      seed: 1337,
    });

    const selectedShares = generatedShares.slice(0, threshold);

    const reconstructedOriginal = combine(selectedShares);

    const permutedShares = [
      selectedShares[2],
      selectedShares[0],
      selectedShares[1],
    ];

    const reconstructedPermuted = combine(permutedShares);

    assert.strictEqual(
      reconstructedOriginal,
      secret,
      'Secret must reconstruct correctly with original share order'
    );

    assert.strictEqual(
      reconstructedPermuted,
      secret,
      'Secret must reconstruct correctly regardless of share order'
    );
  });
});