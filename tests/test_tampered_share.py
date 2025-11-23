from shamir import split, recover

def test_tampered_share_breaks_recovery():
    secret = b"hello"
    shares = split(secret, t=2, n=3)
    tampered = shares[:2]
    tampered[0] = (tampered[0][0], tampered[0][1] + b"\x01")
    assert recover(tampered) != secret
