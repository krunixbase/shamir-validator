# API Stability Policy

## Status

The public API of this repository is considered **frozen** as of
release `v1.0.0-validation`.

---

## Public API

The following functions constitute the public API:

- `split(secret, shares, threshold, options)`
- `combine(shares)`

Their signatures and behavior are guaranteed to remain unchanged
within the `v1.x` series.

---

## Change Policy

The following changes are permitted:

- documentation updates,
- validation test additions,
- CI or metadata improvements,
- security fixes that do not alter API behavior.

The following changes are **not permitted**:

- changes to function signatures,
- changes to return types,
- changes to error semantics,
- changes to deterministic behavior.

---

## Versioning

Any change that would alter the public API requires a new major version
and explicit documentation.

---

## Intent

This repository serves as a validation and reference implementation.
Stability and auditability take precedence over feature expansion.

