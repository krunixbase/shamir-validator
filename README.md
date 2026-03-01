












# shamir-validator

Unified validation suite for Shamir Secret Sharing (SSS), threshold cryptography, deterministic reconstruction, and mathematical correctness verification. This repository consolidates all validation logic from the Krunixbase ecosystem into a single, auditable, reproducible framework.

## Purpose

The goal of `shamir-validator` is to provide a reference‑grade validation environment for:

- correctness of Shamir Secret Sharing implementations,
- deterministic reconstruction behavior,
- polynomial and field arithmetic validation,
- encoding and share‑structure consistency,
- cross‑language interoperability,
- adversarial and fuzzing‑based edge‑case analysis,
- mathematical proofs and formal verification.

This repository is intended for:

- security auditors,
- cryptography engineers,
- researchers,
- developers implementing SSS,
- bug bounty participants,
- institutions requiring formal verification.

## Merged Repositories

This repository consolidates the following validation suites:

- **shamir-sss-validation-suite**
- **shamir-sss-validation**
- **shamir-validation-suite**

All historical commits have been preserved for audit and research purposes.

---

## Repository Structure

```
shamir-validator/
├── core/
├── suites/
├── vectors/
├── proofs/
├── docs/
├── REFERENCE.md
└── README.md
```

### core/
Deterministic, mathematically verifiable validation logic for polynomial operations, reconstruction, and encoding.

### suites/
Modular validation suites for deterministic testing, fuzzing, cross‑language validation, and mathematical proofing.

### vectors/
Canonical deterministic test vectors for SSS, threshold reconstruction, encoding, and field arithmetic.

### proofs/
Mathematical proofs, invariants, and formal verification notes.

### docs/
Documentation for architecture, cryptographic assumptions, validation workflows, and audit‑grade reproducibility.

---

## Mathematical Proof of Reconstruction

Shamir Secret Sharing is based on Lagrange interpolation at x=0.

Given secret \(S \in \mathbb{F}\), threshold \(t\), and polynomial:



\[
f(x) = S + a_1 x + a_2 x^2 + \dots + a_{t-1} x^{t-1}
\]



Shares: \((x_i, y_i)\) with \(y_i = f(x_i)\).

Reconstruction at \(x=0\) uses Lagrange interpolation:



\[
S = \sum_{i=1}^{t} y_i \cdot \prod_{\substack{j=1 \\ j \neq i}}^{t} \frac{-x_j}{x_i - x_j}
\]



## Implementation

Implemented in Python 3.x and JavaScript with deterministic RNG.

Deterministic RNG is used exclusively for reproducible validation and MUST NOT be used in production environments.

---

## CI/CD and Reports

Automated validation runs across multiple seeds: [1337, 42, 2025, 9001, 314159].  
Reports are generated in Markdown (`summary.md`) and HTML (`summary.html`).

---

## 💰 Research Bounty (Optional)

Please use the following Bitcoin address for bounty distribution:  
**bc1q4fv9w2pwpgqyp0gzt20c6n6m4mxs9yga2qgm9f**

This address is provided for voluntary research support only.

---

## Security Recommendations

- Define finite field explicitly (GF(p) or GF(2^n))
- Enforce uniqueness and validity of x-coordinates
- Use cryptographically secure RNG for coefficients
- Add metadata (field, threshold, index, checksum/MAC) to shares
- Implement constant-time field operations

---

## License

This project is licensed under the **GNU General Public License v3.0 (GPL‑3.0)** for source code  
and **CC‑BY 4.0** for documentation.

See the [LICENSE](LICENSE) file for details.

---

## Contact

GitHub: https://github.com/krunixbase  
Email: shamircrackerlab@gmail.com  
X (Twitter): https://twitter.com/shamircrackerlab

