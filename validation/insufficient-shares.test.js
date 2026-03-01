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

