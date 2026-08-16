import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("cardano family", () => {
  it("accepts a bech32 address with the addr1 prefix", () => {
    expect(isValidAddressFor("addr1023456789acdefghjklmnpqrs", "cardano")).toBe(true);
  });

  it("rejects addresses without the addr1 prefix", () => {
    expect(isValidAddressFor("osmo1023456789acdefghjklmnpqrs", "cardano")).toBe(false);
  });
});
