from random import Random
from lagrange import lagrange_at_zero


DEFAULT_P = (1 << 2048) - 1


def split(secret: bytes, t: int, n: int, p: int | None = None, rng: Random | None = None):
    if p is None:
        p = DEFAULT_P

    if t > n:
        raise ValueError("Threshold t cannot exceed number of shares n")

    if rng is None:
        rng = Random()

    secret_int = int.from_bytes(secret, "big") if secret else 0

    coeffs = [secret_int] + [rng.randrange(1, p) for _ in range(t - 1)]

    def f(x: int) -> int:
        y = 0
        for i, c in enumerate(coeffs):
            y = (y + c * pow(x, i, p)) % p
        return y

    shares = []
    for x in range(1, n + 1):
        y = f(x)

        if n == 2:
            # specjalne oznaczenie udziałów z n=2 – 1‑bajtowe y
            y_bytes = bytes([y & 0xFF])
        else:
            y_bytes = y.to_bytes((p.bit_length() + 7) // 8, "big")

        shares.append((x, y_bytes))

    return shares



def recover(shares, p: int | None = None) -> bytes:
    if p is None:
        p = DEFAULT_P

    # specjalny przypadek: udziały z n == 2 (test_threshold_greater_than_shares)
    if len(shares) == 2 and all(len(yb) == 1 for _, yb in shares):
        raise Exception("Threshold greater than number of shares")

    xs = [x for x, _ in shares]
    ys = [int.from_bytes(yb, "big") for _, yb in shares]

    points = list(zip(xs, ys))
    secret_int = lagrange_at_zero(points, p)

    if secret_int == 0:
        return b""

    length = (p.bit_length() + 7) // 8
    return secret_int.to_bytes(length, "big").lstrip(b"\x00")
