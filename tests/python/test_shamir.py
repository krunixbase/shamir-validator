import random
import pytest
from shamirs import shares, lagrange_at_zero
from shamir import split, recover

@pytest.mark.parametrize("secret_int", [1337, 42, 2025, 9001, 314159])
def test_reconstruction_exact(secret_int):
    secret = secret_int.to_bytes((secret_int.bit_length() + 7) // 8, "big")
    s = split(secret, t=2, n=3)
    assert recover(s[:2]) == secret

@pytest.mark.parametrize("secret_int", [1337, 42, 2025, 9001, 314159])
def test_duplicate_x(secret_int):
    secret = secret_int.to_bytes((secret_int.bit_length() + 7) // 8, "big")
    s = split(secret, t=2, n=3)
    dup = [(1, s[0][1]), (1, s[1][1])]
    with pytest.raises(Exception):
        recover(dup)
