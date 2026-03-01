This file is part of Shamir Validator.
Copyright (C) 2026 Andrzej

Shamir Validator is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 as published
by the Free Software Foundation.

Shamir Validator is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Shamir Validator. If not, see <https://www.gnu.org/licenses/>.


from shamir import split, recover

def test_tampered_share_breaks_recovery():
    secret = b"hello"
    shares = split(secret, t=2, n=3)
    tampered = shares[:2]
    tampered[0] = (tampered[0][0], tampered[0][1] + b"\x01")
    assert recover(tampered) != secret