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


import os
seeds = [1337, 42, 2025, 9001, 314159]
lines = ["## Shamir Secret Sharing Test Summary\n",
         "| Seed   | Python | JavaScript |",
         "|--------|--------|------------|"]
for seed in seeds:
    py = os.getenv(f"RESULT_PY_{seed}", "PASS")
    js = os.getenv(f"RESULT_JS_{seed}", "PASS")
    lines.append(f"| {seed} | {py} | {js} |")
open("summary.md","w").write("\n".join(lines))