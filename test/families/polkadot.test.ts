import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("polkadot family (SS58)", () => {
  it("accepts a 46-48 char base58 address", () => {
    expect(
      isValidAddressFor("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmno", "polkadot")
    ).toBe(true);
  });

  it("rejects addresses that are too short", () => {
    expect(isValidAddressFor("short", "polkadot")).toBe(false);
  });

  it("rejects addresses containing 0, O, I or l", () => {
    expect(isValidAddressFor("0OIl" + "1".repeat(44), "polkadot")).toBe(false);
  });
});
