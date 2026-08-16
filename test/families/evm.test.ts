import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

const VALID = "0x0123456789abcdef0123456789abcdef01234567";

describe("evm family", () => {
  it.each(["ethereum", "bsc", "base", "arbitrum", "polygon", "robinhood", "sonic"])(
    "accepts a standard 0x address for %s",
    (chainId) => {
      expect(isValidAddressFor(VALID, chainId)).toBe(true);
    }
  );

  it("rejects addresses missing the 0x prefix", () => {
    expect(isValidAddressFor(VALID.slice(2), "ethereum")).toBe(false);
  });

  it("rejects addresses shorter than 20 bytes", () => {
    expect(isValidAddressFor("0x1234", "ethereum")).toBe(false);
  });

  it("rejects non-hex characters", () => {
    expect(isValidAddressFor("0x" + "z".repeat(40), "ethereum")).toBe(false);
  });
});
