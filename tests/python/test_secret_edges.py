from shamir import split, recover

def test_empty_secret():
    shares = split(b"", t=2, n=3)
    assert recover(shares[:2]) == b""

def test_max_byte_secret():
    secret = bytes([255]) * 32
    shares = split(secret, t=2, n=3)
    assert recover(shares[:2]) == secret
