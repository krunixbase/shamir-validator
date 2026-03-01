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
