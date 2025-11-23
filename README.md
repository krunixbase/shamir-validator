# Shamir Validation Suite

A complete validation and audit package for Shamir Secret Sharing.  
Includes mathematical proof, deterministic tests, CI/CD workflows, and bounty-ready reporting.

## Mathematical Proof of Reconstruction

Given secret \(S \in \mathbb{F}\), threshold \(t\), and polynomial:



\[
f(x) = S + a_1 x + a_2 x^2 + \dots + a_{t-1} x^{t-1}
\]



Shares: \((x_i, y_i)\) with \(y_i = f(x_i)\).  
Reconstruction at \(x=0\) uses Lagrange interpolation:



\[
S = \sum_{i=1}^{t} y_i \cdot \prod_{\substack{j=1 \\ j \neq i}}^{t} \frac{-x_j}{x_i - x_j}
\]


## CI/CD and Reports

- GitHub Actions workflow runs Python and JS tests across matrix seeds.
- Reports generated:
  - `summary.md` – Markdown PASS/FAIL table
  - `summary.html` – color-coded HTML table
- Optional: deploy `summary.html` via GitHub Pages

## 💰 Bounty Address

Please use the following Bitcoin address for bounty distribution:

**bc1q4fv9w2pwpgqyp0gzt20c6n6m4mxs9yga2qgm9f**

## 🔒 Recommendations

- Define finite field explicitly (GF(p) or GF(2^n))
- Enforce uniqueness and validity of x-coordinates
- Use cryptographically secure RNG for coefficients
- Add metadata (field, threshold, index, checksum/MAC) to shares
- Implement constant-time field operations

