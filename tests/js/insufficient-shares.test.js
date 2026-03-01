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

describe('Insufficient shares threshold enforcement', () => {
  it('fails to reconstruct with k-1 shares', () => {
    const secret = 123456;
    const threshold = 3; // k
    const shares = 5;

    const generatedShares = split(secret, shares, threshold, {
      deterministic: true,
      seed: 42,
    });

    const insufficient = generatedShares.slice(0, threshold - 1); // k-1

    assert.throws(
      () => combine(insufficient),
      /threshold|insufficient|shares|reconstruct|invalid/i,
      'Reconstruction must fail with fewer than k shares'
    );
  });
});