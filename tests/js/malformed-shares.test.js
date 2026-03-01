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

