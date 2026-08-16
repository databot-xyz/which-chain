import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("ton family", () => {
  it("accepts a 48-char url-safe base64 address", () => {
    expect(isValidAddressFor("A".repeat(48), "ton")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isValidAddressFor("A".repeat(47), "ton")).toBe(false);
    expect(isValidAddressFor("A".repeat(49), "ton")).toBe(false);
  });

  it("rejects characters outside the url-safe base64 alphabet", () => {
    expect(isValidAddressFor("+".repeat(48), "ton")).toBe(false);
  });
});
