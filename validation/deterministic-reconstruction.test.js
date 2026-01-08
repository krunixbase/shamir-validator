// SPDX-License-Identifier: GPL-3.0-only

import assert from 'assert';
import { split, combine } from '../src/shamir.js';

describe('Deterministic reconstruction with threshold k', () => {
  it('reconstructs the secret with exactly k shares', () => {
    const secret = 123456;
    const threshold = 3;
    const shares = 5;

    const generatedShares = split(secret, shares, threshold, {
      deterministic: true,
      seed: 42
    });

    const selectedShares = generatedShares.slice(0, threshold);
    const reconstructed = combine(selectedShares);

    assert.strictEqual(
      reconstructed,
      secret,
      'Secret must be reconstructed exactly with k shares'
    );
  });
});
