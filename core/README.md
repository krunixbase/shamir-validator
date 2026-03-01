# Core Validation Logic

This directory contains the core cryptographic validation logic used by the
shamir-validator framework. These components implement deterministic,
mathematically verifiable checks for Shamir Secret Sharing and threshold
cryptography.

## Structure

- polynomial/ — validation of polynomial construction, interpolation, and field operations
- reconstruction/ — deterministic reconstruction validation and threshold consistency checks
- encoding/ — validation of encoding formats, share structure, and deterministic encoding rules

## Purpose

The core layer provides the mathematical foundation for all validation suites.
It ensures that all higher‑level tests operate on formally correct, reproducible,
and auditable primitives.
