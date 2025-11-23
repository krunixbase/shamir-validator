# 📊 Test Documentation – Shamir Validation Suite

This directory contains validation tests for the Shamir Secret Sharing algorithm, in two languages: **Python** and **JavaScript**. The tests are deterministic, fault-tolerant, and ready for CI/CD integration.

---

## 🧪 Python Tests (`pytest`)
- `test_shamir.py` – reconstruction, duplicate, threshold, and correctness tests
- `test_threshold_cases.py` – negative cases (`t > n`)
- `test_secret_edges.py` – secret threshold values ​​(`b""`, `b"\xff"*100`)
- `test_tampered_share.py` – test with a tampered share

**Running:**
```bash
pytest tests/
