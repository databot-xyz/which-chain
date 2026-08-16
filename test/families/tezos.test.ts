import { describe, expect, it } from "vitest";
import { isValidAddressFor, verifyChecksum } from "../../src/index";

const TEZOS_ADDRESS = "tz1LHTY6HZLuMRGJq6jfCxD6ug8jGsM6nm69";

describe("tezos family", () => {
  it("accepts a tz1 implicit account address", () => {
    expect(isValidAddressFor(TEZOS_ADDRESS, "tezos")).toBe(true);
  });

  it("resolves the 'xtz' alias", () => {
    expect(isValidAddressFor(TEZOS_ADDRESS, "xtz")).toBe(true);
  });

  it("accepts a KT1 originated contract address shape", () => {
    expect(isValidAddressFor("KT1BRs38y1WCFEZBTaCAY4EGLXkAgAwuUXok", "tezos")).toBe(true);
  });

  it("rejects an unknown prefix", () => {
    expect(isValidAddressFor("tz9LHTY6HZLuMRGJq6jfCxD6ug8jGsM6nm69", "tezos")).toBe(false);
  });

  it("validates the base58check checksum", () => {
    expect(verifyChecksum(TEZOS_ADDRESS, "tezos")).toBe("valid");
    expect(verifyChecksum(TEZOS_ADDRESS.slice(0, -1) + "1", "tezos")).toBe("invalid");
  });
});
