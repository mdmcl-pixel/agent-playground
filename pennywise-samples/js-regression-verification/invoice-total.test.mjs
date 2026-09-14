import assert from "node:assert/strict";
import { invoiceTotal } from "./invoice-total.mjs";

const sample = [
  { price: "10.50", quantity: "2" },
  { price: "5.00", quantity: "1" },
];

assert.equal(invoiceTotal(sample), 26);
assert.equal(invoiceTotal([]), 0);

console.log("Pennywise regression sample: PASS");
