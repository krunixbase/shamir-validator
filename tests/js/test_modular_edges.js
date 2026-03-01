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


const { split, recover } = require('../src/shamir')
const BigInt = require('big-integer')

describe('Modular edge cases in Shamir Secret Sharing', () => {
  test('secret = 0 should reconstruct correctly', () => {
    const secret = BigInt(0)
    const shares = split(secret, 3, 5)
    const recovered = recover(shares.slice(0, 3))
    expect(recovered.equals(secret)).toBe(true)
  })

  test('secret = p - 1 should reconstruct correctly', () => {
    const p = BigInt(2).pow(256).minus(1)
    const secret = p
    const shares = split(secret, 3, 5)
    const recovered = recover(shares.slice(0, 3))
    expect(recovered.equals(secret)).toBe(true)
  })

  test('tampered y_i modulo should break recovery', () => {
    const secret = BigInt(42)
    const shares = split(secret, 3, 5)
    shares[0].y = shares[0].y.add(1).mod(BigInt(257))
    const recovered = recover(shares.slice(0, 3))
    expect(recovered.equals(secret)).toBe(false)
  })

  test('x_i = 0, 1, p-1 should reconstruct correctly', () => {
    const secret = BigInt(123)
    const shares = [
      { x: BigInt(0), y: secret },
      { x: BigInt(1), y: secret.add(1) },
      { x: BigInt(255), y: secret.add(2) }
    ]
    const recovered = recover(shares)
    expect(recovered.equals(secret)).toBe(true)
  })
})
secret = 0, p - 1, x_i = 0, 1, p-1
secret = 0p - 1x_i = 0, 1, p-1