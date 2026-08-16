import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("stellar family", () => {
  it("accepts a G-prefixed 56-char base32 address", () => {
    expect(
      isValidAddressFor("GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ", "stellar")
    ).toBe(true);
  });

  it("resolves the 'xlm' alias", () => {
    expect(
      isValidAddressFor("GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ", "xlm")
    ).toBe(true);
  });

  it("rejects an address not starting with G", () => {
    expect(
      isValidAddressFor("MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ", "stellar")
    ).toBe(false);
  });

  it("rejects the wrong length", () => {
    expect(isValidAddressFor("GA7QYNF7SOWQ3GLR2BGMZ", "stellar")).toBe(false);
  });
});
