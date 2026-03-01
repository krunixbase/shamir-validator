<<<<<<< HEAD

<<<<<<< HEAD
# shamir-validator

Unified validation suite for Shamir Secret Sharing (SSS), threshold cryptography, deterministic reconstruction, and mathematical correctness verification.  
This repository consolidates all validation logic from the Krunixbase ecosystem into a single, auditable, reproducible framework.

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
=======
**API Status:** Frozen (v1.x)

[![Validation Suite](https://github.com/krunixbase/shamir-sss-validation/actions/workflows/validation.yml/badge.svg)](https://github.com/krunixbase/shamir-sss-validation/actions/workflows/validation.yml)

# shamir-sss-validation

Formal validation and deterministic verification suite for Shamir Secret Sharing (SSS) implementations.

This repository is designed for cryptographic audits, bug bounty programs, and technical assurance workflows.  
It focuses on validating mathematical and security properties of Shamir Secret Sharing rather than providing a production-ready implementation.

---

## Purpose

The purpose of this project is to:

- validate core security properties of Shamir Secret Sharing,
- provide deterministic and reproducible test vectors,
- detect implementation flaws, edge cases, and unsafe assumptions,
- support audit and bug bounty review processes.

This repository does **not** aim to:
- serve as a production cryptographic library,
- replace a formal cryptographic audit,
- guarantee security of third-party systems.

---

## Scope

The validation suite focuses on the following properties:

- correctness of secret reconstruction with threshold `k`,
- impossibility of reconstruction with fewer than `k` shares,
- independence and non-correlation of individual shares,
- resistance to trivial reconstruction attacks,
- deterministic reproducibility of validation results.

Out of scope:
- side-channel resistance,
- hardware-level attacks,
- entropy quality of external random number generators,
- protocol-level integrations.

---

## Design Principles

- **Determinism**  
  All validation tests are designed to be reproducible across environments.

- **Property-based validation**  
  Tests focus on cryptographic properties rather than functional behavior alone.

- **Audit-first structure**  
  Repository layout and documentation are optimized for reviewers, not only developers.

- **Defensive clarity**  
  Assumptions, limitations, and boundaries are explicitly documented.

---
>>>>>>> suite2/feat/shamir-validation

## Repository Structure

```

<<<<<<< HEAD
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

## Use Cases

- cryptographic audits  
- bug bounty verification  
- academic research  
- SSS implementation testing  
- deterministic correctness validation  
- compliance and institutional review  
- cross‑repository consistency checks  

## License

This repository uses the Krunixbase dual‑licensing model:

- **Source code:** GNU General Public License v3.0 (GPL‑3.0)
- **Documentation:** Creative Commons Attribution 4.0 International (CC‑BY 4.0)

## Contact

GitHub: https://github.com/krunixbase  
Email: shamircrackerlab@gmail.com  
X (Twitter): https://twitter.com/shamircrackerlab
=======
This repository provides mathematical validation and test coverage.
It does NOT constitute a production-ready cryptographic library.

# Shamir Validation Suite
A mathematical validation and audit package for Shamir Secret Sharing.

See the formal validation report in [reports/validation.md](reports/validation.md).


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
Deterministic RNG is used exclusively for reproducible validation
and MUST NOT be used in production environments.


## CI/CD and Reports
Automated validation runs across multiple seeds: [1337, 42, 2025, 9001, 314159].  
Reports are generated in Markdown (`summary.md`) and HTML (`summary.html`).

## 💰 Research Bounty (Optional)
Please use the following Bitcoin address for bounty distribution:
**bc1q4fv9w2pwpgqyp0gzt20c6n6m4mxs9yga2qgm9f**
This address is provided for voluntary research support only.


## Security Recommendations
- Define finite field explicitly (GF(p) or GF(2^n))
- Enforce uniqueness and validity of x-coordinates
- Use cryptographically secure RNG for coefficients
- Add metadata (field, threshold, index, checksum/MAC) to shares
- Implement constant-time field operations

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.


>>>>>>> suite1/main
=======
shamir-sss-validation/
├── README.md
├── LICENSE
├── SECURITY.md
├── AUDIT.md
├── docs/
│   ├── threat-model.md
│   ├── assumptions.md
│   ├── math-proof.md
│   └── references.md
├── src/
├── validation/
└── ci/

```

---

## License

This project is licensed under the **GNU General Public License v3.0 (GPL‑3.0)**.

Use of this repository or its components in proprietary or closed-source systems requires full compliance with GPL‑3.0 obligations.

The license is intentionally chosen to:
- enforce transparency of modifications,
- prevent closed-source reuse of validation logic,
- preserve audit traceability.

---

## Disclaimer

This repository is provided for validation and research purposes only.

No warranty is provided, express or implied.  
Use of this repository does not guarantee the security or correctness of any cryptographic system.

---

## Contact

For responsible disclosure, audit coordination, or formal inquiries, see `SECURITY.md`.
>>>>>>> suite2/feat/shamir-validation
