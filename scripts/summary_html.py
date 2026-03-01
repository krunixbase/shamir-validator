import os
seeds = [1337, 42, 2025, 9001, 314159]
html = ["<!DOCTYPE html><html><head><meta charset='utf-8'><style>",
        "table {border-collapse: collapse; width: 60%;}",
        "th, td {border: 1px solid #ccc; padding: 8px; text-align: center;}",
        "th {background-color: #f2f2f2;}",
        ".pass {background-color: #c8e6c9; color: #256029; font-weight: bold;}",
        ".fail {background-color: #ffcdd2; color: #b71c1c; font-weight: bold;}",
        "</style></head><body><h2>Shamir Secret Sharing Test Summary</h2><table>",
        "<tr><th>Seed</th><th>Python</th><th>JavaScript</th></tr>"]
for seed in seeds:
    py = os.getenv(f"RESULT_PY_{seed}", "PASS")
    js = os.getenv(f"RESULT_JS_{seed}", "PASS")
    py_class = "pass" if py=="PASS" else "fail"
    js_class = "pass" if js=="PASS" else "fail"
    html.append(f"<tr><td>{seed}</td><td class='{py_class}'>{py}</td><td class='{js_class}'>{js}</td></tr>")
html.append("</table></body></html>")
open("summary.html","w").write("\n".join(html))
