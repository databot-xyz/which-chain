import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

const ALGO_ADDRESS = "KLXMHVW2GBWH2HUNDVDHIALPRVWKUPXALEQIWFXBTHLTB7KYVNMK2XXPU4";

describe("algorand family", () => {
  it("accepts a 58-char base32 address", () => {
    expect(isValidAddressFor(ALGO_ADDRESS, "algorand")).toBe(true);
  });

  it("resolves the 'algo' alias", () => {
    expect(isValidAddressFor(ALGO_ADDRESS, "algo")).toBe(true);
  });

  it("rejects lowercase characters", () => {
    expect(isValidAddressFor(ALGO_ADDRESS.toLowerCase(), "algorand")).toBe(false);
  });

  it("rejects the wrong length", () => {
    expect(isValidAddressFor(ALGO_ADDRESS.slice(0, 40), "algorand")).toBe(false);
  });
});
