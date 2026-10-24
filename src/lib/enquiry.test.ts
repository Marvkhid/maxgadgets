import assert from "node:assert/strict";
import test from "node:test";
import { cleanEnquiry, emptyEnquiry, validateEnquiry } from "./enquiry";

const base = { name: "Ada Obi", phone: "0706 111 2222" };

test("a complete bulk enquiry is valid", () => {
  const data = cleanEnquiry({ ...base, type: "bulk", model: "iPhone 15 Pro Max", quantity: "10" });
  assert.deepEqual(validateEnquiry(data), {});
});

test("empty forms report every required field", () => {
  const errors = validateEnquiry(emptyEnquiry("repair"));
  assert.ok(errors.name && errors.phone && errors.model && errors.problem);
});

test("phone numbers need 7 to 15 digits", () => {
  assert.ok(validateEnquiry(cleanEnquiry({ ...base, phone: "123", type: "general", message: "Hello there" })).phone);
  assert.equal(validateEnquiry(cleanEnquiry({ ...base, phone: "+234 706 263 5457", type: "general", message: "Hello there" })).phone, undefined);
});

test("email is optional but must look right when given", () => {
  const ok = cleanEnquiry({ ...base, type: "general", message: "Hello there" });
  assert.equal(validateEnquiry(ok).email, undefined);
  assert.ok(validateEnquiry({ ...ok, email: "not-an-email" }).email);
});

test("bulk quantity must be at least 1", () => {
  const data = cleanEnquiry({ ...base, type: "bulk", model: "iPhone 14", quantity: "0" });
  assert.ok(validateEnquiry(data).quantity);
});

test("unknown types fall back to general and long text is trimmed", () => {
  const data = cleanEnquiry({ ...base, type: "hack", message: "x".repeat(5000) });
  assert.equal(data.type, "general");
  assert.equal(data.message.length, 1500);
});

test("non-string values are ignored", () => {
  const data = cleanEnquiry({ name: 42, phone: null, type: "iphone", model: { a: 1 } });
  assert.equal(data.name, "");
  assert.equal(data.model, "");
});
