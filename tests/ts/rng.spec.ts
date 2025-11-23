import { SeededRNG } from '../src/rng'

test('SeededRNG is deterministic', () => {
  const rng1 = new SeededRNG(1337)
  const rng2 = new SeededRNG(1337)
  expect([rng1.next(), rng1.next()]).toEqual([rng2.next(), rng2.next()])
})
