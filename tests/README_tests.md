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

---

## 🧪 Message Tests (`SeededMsg`)
- `msg.spec.ts` – tests the deterministic, stateful operation of the `SeededMsg` message generator.

**Test Description:**
``ts
test('SeededMsg is deterministic', () => {
const rng1 = new SeededMsg(123456)
const rng2 = new SeededMsg(123456)
expect(rng1.next()).toEqual(rng2.next()) // identical first result
expect(rng1.next()).not.toEqual(rng2.next()) // different subsequent results
})
