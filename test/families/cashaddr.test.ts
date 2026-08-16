import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

const CASHADDR = `q${"x".repeat(41)}`;

describe("cashaddr family (Bitcoin Cash)", () => {
  it("accepts a bare 42-char address starting with 'q'", () => {
    expect(isValidAddressFor(CASHADDR, "bitcoincash")).toBe(true);
  });

  it("accepts the 'bitcoincash:' prefixed form", () => {
    expect(isValidAddressFor(`bitcoincash:${CASHADDR}`, "bitcoincash")).toBe(true);
  });

  it("resolves the 'bch' alias", () => {
    expect(isValidAddressFor(CASHADDR, "bch")).toBe(true);
  });

  it("accepts a P2SH address starting with 'p'", () => {
    expect(isValidAddressFor(`p${"x".repeat(41)}`, "bitcoincash")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isValidAddressFor("qtoosh0rt", "bitcoincash")).toBe(false);
  });
});
