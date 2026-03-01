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

def test_empty_secret():
    shares = split(b"", t=2, n=3)
    assert recover(shares[:2]) == b""

def test_max_byte_secret():
    secret = bytes([0xFF]) * 100
    shares = split(secret, t=3, n=5)
    assert recover(shares[-3:]) == secret