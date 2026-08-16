import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("solana family", () => {
  it("accepts a well-formed base58 address", () => {
    expect(
      isValidAddressFor("So11111111111111111111111111111111111111112", "solana")
    ).toBe(true);
  });

  it("resolves the 'sol' alias", () => {
    expect(
      isValidAddressFor("So11111111111111111111111111111111111111112", "sol")
    ).toBe(true);
  });

  it("rejects addresses containing 0, O, I or l (not in the base58 alphabet)", () => {
    expect(isValidAddressFor("0OIl" + "1".repeat(30), "solana")).toBe(false);
  });

  it("rejects addresses shorter than 32 characters", () => {
    expect(isValidAddressFor("shortaddress", "solana")).toBe(false);
  });
});
