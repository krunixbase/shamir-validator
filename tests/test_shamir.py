import random
import pytest
from shamirs import shares, lagrange_at_zero

P = 2**127 - 1
SEEDS = [1337, 42, 2025, 9001, 314159]

@pytest.mark.parametrize("seed", SEEDS)
def test_reconstruction_exact(seed):
    rng = random.Random(seed)
    secret = rng.randrange(P)
    xs, ys = shares(secret, t=3, n=5, p=P, rng=rng)
    rec = lagrange_at_zero(xs[:3], ys[:3], P)
    assert rec == secret

@pytest.mark.parametrize("seed", SEEDS)
def test_duplicate_x(seed):
    rng = random.Random(seed)
    secret = rng.randrange(P)
    xs, ys = shares(secret, t=3, n=5, p=P, rng=rng)
    xs[1] = xs[0]  # force duplicate
    with pytest.raises(Exception):
        lagrange_at_zero(xs[:3], ys[:3], P)

