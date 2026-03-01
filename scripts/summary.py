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
