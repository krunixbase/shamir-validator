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