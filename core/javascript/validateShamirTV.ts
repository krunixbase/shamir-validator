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


import { Result, RESALT_TV } from './types'

export function checkShamirThresholdVsShares(threshold: number, shares: unknown[]): boolean {
  return threshold <= shares.length
}

export function validateResult(resalt: RESALT_TV): Result {
  const isValid = checkShamirThresholdVsShares(resalt.threshold, resalt.shares)

  return {
    isValid,
    message: isValid
      ? 'Threshold is valid in relation to shares.'
      : 'Threshold is invalid in relation to shares.'
  }
}