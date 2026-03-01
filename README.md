# Shamir Validator

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Tests](https://img.shields.io/badge/Tests-Python%20%2B%20JavaScript-success)
![Status](https://img.shields.io/badge/Project-Unified%20Release%20v1.0.0-orange)
![Topics](https://img.shields.io/badge/Topics-SSS%2C%20Cryptography%2C%20Validator-lightgrey)

Shamir Validator is a deterministic, cross‑language validation framework for implementations of Shamir’s Secret Sharing (SSS). It provides reference implementations, mathematical modules, deterministic test vectors, cross‑language test suites, fuzzing, and formal documentation to ensure that SSS implementations behave correctly, consistently, and securely across environments.

The project unifies multiple earlier repositories into a single, coherent structure designed for cryptographic audits, reproducible research, and high‑assurance engineering.

---

# Purpose and Scope

## Shamir’s Secret Sharing is widely implemented, but real‑world libraries often diverge in:

- finite‑field arithmetic

- polynomial interpolation

- share generation

- threshold handling

- edge‑case behavior

- reconstruction logic

- resistance to malformed or adversarial shares

## Shamir Validator addresses these issues by providing:

- reference implementations in Python and JavaScript

- deterministic test vectors for reproducibility

- cross‑language validation to ensure equivalence

- fuzzing and edge‑case suites

- formal mathematical documentation

- auditable test reports

The goal is to make SSS implementations verifiable, predictable, and interoperable.

---

## Repository Structure

```
core/           Reference implementations and mathematical modules
  ├── python/       Python implementation of SSS and validation logic
  ├── javascript/   JavaScript implementation of SSS and validation logic
  ├── encoding/     Encoding and field utilities
  ├── polynomial/   Polynomial operations in GF(p)
  └── reconstruction/  Secret reconstruction logic

tests/          Deterministic and adversarial test suites
  ├── python/       Python unit tests
  └── js/           JavaScript unit tests and validation tests

suites/         High‑level validation suites
  ├── deterministic/     Deterministic vector tests
  ├── fuzzing/           Deterministic fuzzing
  ├── cross-language/    Python ↔ JS equivalence tests
  └── mathematical/      Tests aligned with formal proofs

docs/           Documentation and audit materials
  ├── math-proof.md
  ├── threat-model.md
  ├── assumptions.md
  ├── validation-report.md
  ├── api-stability.md
  └── audit/AUDIT.md

vectors/        Deterministic test vectors  
reports/        Validation and audit reports  
scripts/        Utility scripts (summary generation, HTML reports)  
ci/             Continuous integration configuration  

```
This structure is optimized for auditability, reproducibility, and cross‑language consistency.

---

# Validation Model

## Deterministic Test Vectors

All tests use deterministic RNG to ensure:

- reproducible results,

- cross‑language consistency,

- stable audit trails.

## Cross‑Language Equivalence

Every operation is validated in both:

- core/python/

- core/javascript/

and results are compared to guarantee identical behavior.

## Mathematical Correctness

The docs/ directory contains:

- formal proofs of correctness,

- threat models,

- assumptions and constraints,

- validation methodology.

These documents define the expected behavior of any compliant SSS implementation.

---

# Running Tests 

## Python

```
cd tests/python
pytest -q
```

## JavaScript

```
npm install
npm test
```

## Cross‑Language Validation

Cross‑language tests live in:

```
suites/cross-language/
```
They compare Python and JavaScript outputs for identical inputs.

---

## Reference Implementations

The core/ directory contains clean, auditable implementations of:

- finite‑field arithmetic in GF(p),

- polynomial evaluation and interpolation,

- share generation,

- secret reconstruction,

- validation logic.

These implementations serve as a correctness baseline for other libraries.

---

# Documentation

## The docs/ directory provides:

- math-proof.md — formal proof of correctness,

- threat-model.md — adversarial considerations,

- assumptions.md — cryptographic assumptions,

- validation-report.md — methodology and results,

- api-stability.md — API guarantees,

- audit/AUDIT.md — audit‑grade documentation.

This makes the project suitable for academic, industrial, and security‑critical use.

---

# Use Cases

- verifying correctness of third‑party SSS libraries,

- ensuring cross‑language interoperability,

- generating deterministic test vectors,

- validating edge‑case behavior,

- performing fuzzing with reproducible seeds,

- supporting cryptographic audits and formal verification.

---

## Legacy repositories

This project consolidates the following archived repositories:

- https://github.com/krunixbase/shamir-sss-validation-suite
- https://github.com/krunixbase/shamir-validation-suite
- https://github.com/krunixbase/shamir-ss-validation

---

## License

This project is licensed under the GNU General Public License v3.0 (GPL‑3.0).
See the LICENSE file for the full text.

---

# ❓ FAQ — Frequently Asked Questions

## What algorithm does this project use to reconstruct the secret?

- The validator uses Lagrange interpolation over a finite field defined by a large prime modulus. Both the Python and JavaScript implementations follow the same mathematical model to  ensure identical results across languages.

## Why does the JavaScript implementation use BigInt instead of Number?

- JavaScript’s Number type is limited to 53 bits of precision, which causes incorrect results when performing modular arithmetic on large integers. BigInt provides full integer precision, making the implementation mathematically correct and consistent with Python.

## Is this project intended for production use?

- The project is designed as a reference validation suite, not a production‑grade cryptographic library. It is ideal for testing, verifying, and comparing Shamir Secret Sharing implementations, but it is not optimized for performance or hardened for production security.

## Does this project implement full Shamir Secret Sharing?

- It implements secret reconstruction and the underlying Lagrange interpolation. It does not implement share generation, because the purpose of the project is validation rather than providing a complete SSS toolkit.

## Can I use my own prime modulus?
- Yes. The validator works with any sufficiently large prime modulus. The test suite uses a standard 256‑bit prime commonly used in SSS implementations, but you can supply your own.

# Are the Python and JavaScript test suites equivalent?

## Yes. The test suites are unified and include:

- deterministic reconstruction tests

- fuzzing tests

- edge‑case tests

- share permutation tests

- corrupted‑share resistance tests

Both implementations must pass the same scenarios.

# Why were the old repositories archived?

## Three earlier repositories were merged into this unified project to:

- eliminate duplication

- simplify maintenance

- unify licensing

- ensure consistent test coverage

- provide a single authoritative validator

The old repositories remain available for historical reference.

## Can I contribute new tests or improvements?

- Yes. The project is open‑source under GPL‑3.0, and contributions are welcome. You may add new tests, improve implementations, or propose new features through pull requests.

## Does the project support TypeScript?

- The JavaScript implementation is compatible with TypeScript, but it does not include .d.ts type definitions. You may add your own or contribute official typings via pull request.

## Is a command‑line interface (CLI) planned?

- Yes. A CLI tool for quick validation, share checking, and report generation is planned for a future release.

## Can I use this project in commercial software?

- Yes, but only under the terms of GPL‑3.0, which requires that derivative works remain open‑source under the same license.

---
