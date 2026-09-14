# Pennywise — JS Regression Verification Sample

A small, self-contained public proof sample demonstrating Pennywise's workflow:

**reproduce → diagnose → fix → regression-test → verify**

## Scenario

A JavaScript helper should calculate an invoice total from line items. The buggy implementation concatenates string prices instead of adding numeric values, producing an incorrect total when API/CSV data contains numeric strings.

### Buggy implementation

```js
export function invoiceTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, "");
}
```

Example input:

```js
[
  { price: "10.50", quantity: 2 },
  { price: "5.00", quantity: 1 }
]
```

Expected: `26`

Buggy result: `0215`

## Root cause

The reducer starts with an empty string (`""`). JavaScript therefore performs string concatenation after each multiplication rather than numeric addition.

## Fix

```js
export function invoiceTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );
}
```

## Regression test

```js
import assert from "node:assert/strict";
import { invoiceTotal } from "./invoice-total.js";

assert.equal(
  invoiceTotal([
    { price: "10.50", quantity: 2 },
    { price: "5.00", quantity: 1 }
  ]),
  26
);

assert.equal(invoiceTotal([]), 0);
console.log("PASS: invoiceTotal regression checks");
```

## Verification

The corrected implementation uses a numeric accumulator and explicitly converts external numeric values before arithmetic. The regression checks cover the reported numeric-string case and the empty-input baseline.

This sample is intentionally small and contains no customer code, secrets, private data, or unsupported claims. It demonstrates the review method Pennywise can apply to scoped JavaScript/TypeScript debugging and regression-testing work.
