from shamir import split, recover

def test_empty_secret():
    shares = split(b"", t=2, n=3)
    assert recover(shares[:2]) == b""

def test_max_byte_secret():
    secret = bytes([0xFF]) * 100
    shares = split(secret, t=3, n=5)
    assert recover(shares[-3:]) == secret
