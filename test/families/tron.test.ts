import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("tron family", () => {
  it("accepts a well-formed T-prefixed base58 address", () => {
    expect(isValidAddressFor("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "tron")).toBe(true);
  });

  it("rejects addresses not starting with T", () => {
    expect(isValidAddressFor("XR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "tron")).toBe(false);
  });

  it("rejects the wrong total length", () => {
    expect(isValidAddressFor("TR7NHqjeKQx", "tron")).toBe(false);
  });
});
