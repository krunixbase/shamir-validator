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

describe('Malformed shares handling', () => {
  it('fails to reconstruct when a share is malformed', () => {
    const secret = 424242;
    const threshold = 3;
    const shares = 5;

    const generatedShares = split(secret, shares, threshold, {
      deterministic: true,
      seed: 2024,
    });

    const validShares = generatedShares.slice(0, threshold);

    // Introduce a malformed share (corrupted value)
    const malformedShare = {
      ...validShares[0],
      y: validShares[0].y + 1, // deliberate corruption
    };

    const mixedShares = [
      malformedShare,
      validShares[1],
      validShares[2],
    ];

    assert.throws(
      () => combine(mixedShares),
      /invalid|malformed|corrupt|reconstruct|share/i,
      'Reconstruction must fail when a malformed share is provided'
    );
  });
});