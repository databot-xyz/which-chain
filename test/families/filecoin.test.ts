import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("filecoin family", () => {
  it("accepts an f0 (ID) address", () => {
    expect(isValidAddressFor("f01234", "filecoin")).toBe(true);
  });

  it("accepts an f1 (secp256k1) address", () => {
    expect(isValidAddressFor(`f1${"q".repeat(39)}`, "filecoin")).toBe(true);
  });

  it("accepts an f3 (BLS) address", () => {
    expect(isValidAddressFor(`f3${"a".repeat(84)}`, "filecoin")).toBe(true);
  });

  it("resolves the 'fil' alias", () => {
    expect(isValidAddressFor("f01234", "fil")).toBe(true);
  });

  it("accepts testnet ('t...') addresses", () => {
    expect(isValidAddressFor("t01234", "filecoin")).toBe(true);
  });

  it("rejects an unknown protocol digit", () => {
    expect(isValidAddressFor("f9somejunk", "filecoin")).toBe(false);
  });
});
