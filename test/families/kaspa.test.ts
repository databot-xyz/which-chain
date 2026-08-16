import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("kaspa family", () => {
  it("accepts a kaspa:-prefixed address", () => {
    expect(isValidAddressFor("kaspa:023456789acdefghjklmnpqrs", "kaspa")).toBe(true);
  });

  it("rejects addresses missing the kaspa: prefix", () => {
    expect(isValidAddressFor("023456789acdefghjklmnpqrs", "kaspa")).toBe(false);
  });
});
