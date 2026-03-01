# Mathematical Basis and Proof Outline

## Purpose

This document outlines the mathematical foundations and proof assumptions
underlying the validation performed by the `shamir-sss-validation` repository.

It is intended to clarify which properties are relied upon, which are validated,
and which are assumed based on established cryptographic literature.

This document does not constitute a formal machine-verified proof.

---

## Shamir Secret Sharing Overview

Shamir Secret Sharing (SSS) is based on the following principles:

- a secret is embedded as the constant term of a polynomial of degree `k - 1`,
- shares are generated as evaluations of this polynomial at distinct non-zero points,
- reconstruction requires interpolation of the polynomial using at least `k` points.

Security relies on properties of polynomial interpolation over finite fields.

---

## Correctness Property

Given:
- a polynomial `f(x)` of degree `k - 1`,
- `k` distinct points `(x_i, f(x_i))`,

the polynomial can be uniquely reconstructed using Lagrange interpolation.

This property guarantees correct reconstruction of the secret when at least
`k` valid shares are provided.

---

## Confidentiality Property

Given fewer than `k` shares:

- infinitely many polynomials of degree `k - 1` exist that pass through the known points,
- the constant term (the secret) remains information-theoretically hidden.

This property provides unconditional confidentiality under the assumption of
correct finite field arithmetic.

---

## Validation Approach

This repository validates the above properties by:

- deterministic reconstruction tests with exactly `k` shares,
- negative tests using fewer than `k` shares,
- detection of reconstruction attempts that violate threshold requirements,
- verification of share independence under controlled conditions.

Validation confirms consistency with the mathematical model but does not
replace formal proof verification.

---

## Assumptions and Limitations

The outlined properties assume:

- correct finite field selection and arithmetic,
- absence of implementation-level flaws,
- correct interpretation of validation results.

This repository does not attempt to formally prove Shamir Secret Sharing,
but to validate that implementations conform to its mathematical model.

---

## References

- A. Shamir, "How to Share a Secret", Communications of the ACM, 1979
- Standard cryptographic textbooks and peer-reviewed literature

