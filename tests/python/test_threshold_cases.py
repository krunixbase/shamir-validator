import pytest
from shamir import split, recover

def test_threshold_greater_than_shares():
    secret = b"abc"
    shares = split(secret, t=2, n=2)
    t = 3
    with pytest.raises(Exception):
        recover(shares[:t])
