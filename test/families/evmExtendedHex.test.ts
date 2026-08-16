import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

const VALID_64 = "0x" + "ab".repeat(32);

describe("evm-extended-hex family (aptos, sui, starknet)", () => {
  it.each(["aptos", "sui", "starknet"])("accepts a 64-hex-char 0x address for %s", (chainId) => {
    expect(isValidAddressFor(VALID_64, chainId)).toBe(true);
  });

  it("also accepts a shorter, non-zero-padded address (common for starknet)", () => {
    expect(isValidAddressFor("0x" + "a".repeat(50), "starknet")).toBe(true);
  });

  it("rejects addresses missing the 0x prefix", () => {
    expect(isValidAddressFor(VALID_64.slice(2), "aptos")).toBe(false);
  });

  it("rejects more than 64 hex characters", () => {
    expect(isValidAddressFor("0x" + "a".repeat(65), "sui")).toBe(false);
  });

  it("does not overlap with a standard 40-hex-char EVM address", () => {
    expect(isValidAddressFor("0x" + "a".repeat(40), "aptos")).toBe(false);
  });
});
