from random import Random
from shamir import split, recover
from lagrange import lagrange_at_zero as _lagrange_at_zero


def shares(secret: int, t: int, n: int, p: int, rng: Random | None = None):
    if rng is None:
        rng = Random()

    # int -> bytes
    if secret == 0:
        secret_bytes = b""
    else:
        length = (p.bit_length() + 7) // 8
        secret_bytes = secret.to_bytes(length, "big")

    raw_shares = split(secret_bytes, t=t, n=n, p=p, rng=rng)

    xs = []
    ys = []
    for x, y_bytes in raw_shares:
        xs.append(x)
        ys.append(int.from_bytes(y_bytes, "big"))

    return xs, ys


def lagrange_at_zero(xs, ys, p):
    points = list(zip(xs, ys))
    return _lagrange_at_zero(points, p)
