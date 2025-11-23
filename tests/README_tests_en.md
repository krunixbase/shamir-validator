# 📊 Test Suite Documentation – Shamir Validation Suite

This directory contains audit-grade validation tests for the Shamir Secret Sharing algorithm, implemented in both **Python** and **JavaScript**. All tests are deterministic, reproducible, and CI/CD-ready.

---

## 🧪 Python Tests (`pytest`)
- `test_shamir.py` – reconstruction, threshold logic, duplicate shares, and correctness
- `test_threshold_cases.py` – negative cases (`threshold > number of shares`)
- `test_secret_edges.py` – edge cases for secrets (`empty`, `max-byte`)
- `test_tampered_share.py` – recovery failure with manipulated share

**Run all Python tests:**
```bash
pytest tests/
