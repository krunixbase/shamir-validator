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

## Repository Structure

```

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
