import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("bitcoin-like family", () => {
  it("accepts a P2PKH bitcoin address", () => {
    expect(isValidAddressFor("1123456789ABCDEFGHJKLMNPQRSTUVW", "bitcoin")).toBe(true);
  });

  it("accepts a bech32 native-segwit bitcoin address", () => {
    expect(isValidAddressFor("bc1023456789acdefghjklmnpqrstuvw", "bitcoin")).toBe(true);
  });

  it("resolves the 'btc' alias", () => {
    expect(isValidAddressFor("1123456789ABCDEFGHJKLMNPQRSTUVW", "btc")).toBe(true);
  });

  it("accepts an L-prefixed litecoin address", () => {
    expect(isValidAddressFor("L123456789ABCDEFGHJKLMNPQRSTUVW", "litecoin")).toBe(true);
  });

  it("accepts a D-prefixed dogecoin address", () => {
    expect(isValidAddressFor("D123456789ABCDEFGHJKLMNPQRSTUVW", "dogecoin")).toBe(true);
  });

  it("rejects a dogecoin address against the bitcoin pattern", () => {
    expect(isValidAddressFor("D123456789ABCDEFGHJKLMNPQRSTUVW", "bitcoin")).toBe(false);
  });
});
