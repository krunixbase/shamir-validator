// SPDX-License-Identifier: GPL-3.0-only

import assert from 'assert';
import { combine } from '../src/shamir.js';

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomShare() {
  return {
    x: randomInt(1000),
    y: randomInt(1000000),
  };
}

describe('Fuzz resilience and defensive behavior', () => {
  it('does not reconstruct secret from random or malformed input', () => {
    for (let i = 0; i < 100; i++) {
      const randomShares = Array.from(
        { length: randomInt(5) + 1 },
        randomShare
      );

      try {
        const result = combine(randomShares);

        assert.notStrictEqual(
          typeof result,
          'number',
          'Random input must not yield a valid secret'
        );
      } catch (err) {
        assert.ok(
          err instanceof Error,
          'Errors thrown during fuzzing must be explicit'
        );
      }
    }
  });
});
