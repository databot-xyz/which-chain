import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("bech32 family (cosmos, osmosis, injective, celestia)", () => {
  it.each(["cosmos", "osmosis", "injective", "celestia"])(
    "accepts a bech32-shaped address for %s",
    (chainId) => {
      expect(isValidAddressFor("osmo1023456789acdefghjklmnpqrs", chainId)).toBe(true);
    }
  );

  it("rejects addresses missing the '1' separator", () => {
    expect(isValidAddressFor("osmo023456789acdefghjklmnpqrs", "cosmos")).toBe(false);
  });

  it("rejects addresses containing the excluded bech32 characters b, i, o, 1(as data)", () => {
    expect(isValidAddressFor("osmo1binvalidchars", "cosmos")).toBe(false);
  });
});
