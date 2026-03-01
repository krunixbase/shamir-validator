# Shamir Validator
Shamir Validator is a deterministic, cross‑language validation framework for implementations of Shamir’s Secret Sharing (SSS). It provides reference implementations, mathematical modules, deterministic test vectors, cross‑language test suites, fuzzing, and formal documentation to ensure that SSS implementations behave correctly, consistently, and securely across environments.

The project unifies multiple earlier repositories into a single, coherent structure designed for cryptographic audits, reproducible research, and high‑assurance engineering.

---

## Purpose and Scope

Shamir’s Secret Sharing is widely implemented, but real‑world libraries often diverge in:

- finite‑field arithmetic

- polynomial interpolation

- share generation

- threshold handling

- edge‑case behavior

- reconstruction logic

- resistance to malformed or adversarial shares

Shamir Validator addresses these issues by providing:

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

## Validation Model

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

## Running Tests 

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

## Documentation

The docs/ directory provides:

- math-proof.md — formal proof of correctness,

- threat-model.md — adversarial considerations,

- assumptions.md — cryptographic assumptions,

- validation-report.md — methodology and results,

- api-stability.md — API guarantees,

- audit/AUDIT.md — audit‑grade documentation.

This makes the project suitable for academic, industrial, and security‑critical use.

---

## Use Cases

- verifying correctness of third‑party SSS libraries,

- ensuring cross‑language interoperability,

- generating deterministic test vectors,

- validating edge‑case behavior,

- performing fuzzing with reproducible seeds,

- supporting cryptographic audits and formal verification.

---

## License

This project is licensed under the MIT License.
See LICENSE for details.

---
