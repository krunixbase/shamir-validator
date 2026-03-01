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
import { split } from '../src/shamir.js';

describe('Share independence and correlation resistance', () => {
  it('does not reveal secret information in a single share', () => {
    const threshold = 3;
    const shares = 5;

    const secretA = 111111;
    const secretB = 999999;

    const sharesA = split(secretA, shares, threshold, {
      deterministic: true,
      seed: 777,
    });

    const sharesB = split(secretB, shares, threshold, {
      deterministic: true,
      seed: 777,
    });

    const shareA = sharesA[0];
    const shareB = sharesB[0];

    assert.notStrictEqual(
      shareA.y,
      secretA,
      'Single share must not equal the secret'
    );

    assert.notStrictEqual(
      shareB.y,
      secretB,
      'Single share must not equal the secret'
    );

    assert.notStrictEqual(
      shareA.y,
      shareB.y,
      'Single share value must differ for different secrets'
    );
  });
});