# Shamir Secret Sharing — Formal Validation Report

## 1. Introduction

This document provides a formal mathematical validation of the reconstruction
process used in Shamir Secret Sharing (SSS).  
The goal is to demonstrate, step by step, that the reconstruction algorithm
implemented in this repository correctly recovers the secret using
Lagrange interpolation at \( x = 0 \).

This report is intended for auditors, researchers, and engineers who require
a mathematically rigorous explanation of the reconstruction process.

---

## 2. Finite Field Model

Shamir Secret Sharing operates over a finite field \( \mathbb{F} \), typically:

- a prime field \( \mathbb{F}_p \), or  
- a binary extension field \( \mathbb{F}_{2^n} \).

For validation purposes, this repository uses integers modulo a large prime,
but the mathematical structure remains identical for any finite field.

All operations (addition, subtraction, multiplication, division) are performed in \( \mathbb{F} \).

---

## 3. Polynomial Construction

Given:

- secret \( S \in \mathbb{F} \)
- threshold \( t \)
- random coefficients \( a_1, a_2, \dots, a_{t-1} \in \mathbb{F} \)

The polynomial is defined as:



\[
f(x) = S + a_1 x + a_2 x^2 + \dots + a_{t-1} x^{t-1}
\]



This is a polynomial of degree \( t - 1 \).

---

## 4. Share Generation

Each share is a point on the polynomial:



\[
(x_i, y_i) \quad \text{where} \quad y_i = f(x_i)
\]



Constraints:

- \( x_i \neq 0 \)
- \( x_i \neq x_j \) for \( i \neq j \)

Uniqueness of \( x_i \) ensures invertibility of denominators during interpolation.

---

## 5. Reconstruction Formula

To reconstruct the secret, we evaluate the polynomial at \( x = 0 \):



\[
S = f(0)
\]



Using Lagrange interpolation:



\[
S = \sum_{i=1}^{t} y_i \cdot \lambda_i
\]



Where each Lagrange basis coefficient is:



\[
\lambda_i = \prod_{\substack{j=1 \\ j \neq i}}^{t} \frac{x_j}{x_j - x_i}
\]



This formula is valid because:

- it reconstructs the unique polynomial of degree \( t - 1 \)
- evaluating at \( x = 0 \) isolates the constant term \( S \)

---

## 6. Worked Example

Let:

- \( S = 1234 \)
- \( t = 3 \)
- coefficients: \( a_1 = 5 \), \( a_2 = 7 \)

Polynomial:



\[
f(x) = 1234 + 5x + 7x^2
\]



Shares:

- \( x_1 = 1 \Rightarrow y_1 = 1246 \)
- \( x_2 = 2 \Rightarrow y_2 = 1268 \)
- \( x_3 = 3 \Rightarrow y_3 = 1300 \)

Reconstruction:



\[
S = y_1 \cdot \lambda_1 + y_2 \cdot \lambda_2 + y_3 \cdot \lambda_3
\]



Where:



\[
\lambda_1 = \frac{2}{2-1} \cdot \frac{3}{3-1} = 3
\]




\[
\lambda_2 = \frac{1}{1-2} \cdot \frac{3}{3-2} = -3
\]




\[
\lambda_3 = \frac{1}{1-3} \cdot \frac{2}{2-3} = 1
\]



Thus:



\[
S = 1246 \cdot 3 + 1268 \cdot (-3) + 1300 \cdot 1 = 1234
\]



The reconstruction is correct.

---

## 7. Implementation Validation

The Python and JavaScript implementations in this repository:

- compute Lagrange coefficients correctly
- operate entirely within a finite field
- mask sensitive values in logs
- use deterministic RNG for reproducibility

Cross-language tests confirm identical results.

---

## 8. Security Notes

This validation suite is **not** a production implementation.

For real-world use:

- use cryptographically secure RNG
- validate all share indices
- use constant-time arithmetic
- bind metadata (field, threshold, index, MAC)
- avoid deterministic randomness

---

## 9. Conclusion

This report demonstrates that the reconstruction algorithm implemented in this repository
is mathematically sound and correctly recovers the secret using Lagrange interpolation.

The suite provides a reliable reference for audits, education, and research.
