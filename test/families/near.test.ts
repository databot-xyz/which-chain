import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("near family", () => {
  it("accepts a named account ending in .near", () => {
    expect(isValidAddressFor("token.near", "near")).toBe(true);
  });

  it("accepts a named account ending in .testnet", () => {
    expect(isValidAddressFor("my-app.testnet", "near")).toBe(true);
  });

  it("accepts a 64-char implicit hex account", () => {
    expect(isValidAddressFor("a".repeat(64), "near")).toBe(true);
  });

  it("rejects a named account with an unrelated suffix", () => {
    expect(isValidAddressFor("token.com", "near")).toBe(false);
  });
});
