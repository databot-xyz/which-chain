import { describe, expect, it } from "vitest";
import { isValidAddressFor } from "../../src/index";

describe("hedera family", () => {
  it("accepts a shard.realm.num account id", () => {
    expect(isValidAddressFor("0.0.12345", "hedera")).toBe(true);
  });

  it("rejects an id with more than three segments", () => {
    expect(isValidAddressFor("0.0.0.12345", "hedera")).toBe(false);
  });

  it("rejects an id with fewer than three segments", () => {
    expect(isValidAddressFor("0.12345", "hedera")).toBe(false);
  });
});
