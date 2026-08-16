import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("xrpl family", () => {
  it("accepts a classic r-prefixed address", () => {
    expect(isValidAddressFor("r123456789ABCDEFGHJKLMNPQRSTUVW", "xrpl")).toBe(true);
  });

  it("rejects addresses not starting with r", () => {
    expect(isValidAddressFor("x123456789ABCDEFGHJKLMNPQRSTUVW", "xrpl")).toBe(false);
  });

  it("rejects addresses that are too short", () => {
    expect(isValidAddressFor("rShort", "xrpl")).toBe(false);
  });
});
