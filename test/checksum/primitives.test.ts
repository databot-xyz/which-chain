import { describe, expect, it } from "vitest";
import { sha256 } from "../../src/checksum/sha256";
import { keccak256 } from "../../src/checksum/keccak256";
import { decodeBase58 } from "../../src/checksum/base58";
import { verifyBase58Check } from "../../src/checksum/base58check";
import { verifyBech32 } from "../../src/checksum/bech32";
import { verifyEip55 } from "../../src/checksum/eip55";

function hex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

describe("sha256", () => {
  it("matches known FIPS 180-4 test vectors", () => {
    expect(hex(sha256(new TextEncoder().encode("")))).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    expect(hex(sha256(new TextEncoder().encode("abc")))).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
  });
});

describe("keccak256", () => {
  it("matches known digests (verified against PyCryptodome's Keccak-256)", () => {
    expect(hex(keccak256(new Uint8Array(0)))).toBe(
      "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    );
    expect(hex(keccak256(new TextEncoder().encode("abc")))).toBe(
      "4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45"
    );
  });
});

describe("decodeBase58", () => {
  it("decodes leading '1's as leading zero bytes", () => {
    expect(decodeBase58("1")).toEqual(new Uint8Array([0]));
    expect(decodeBase58("11")).toEqual(new Uint8Array([0, 0]));
  });

  it("returns null for invalid characters", () => {
    expect(decodeBase58("0OIl")).toBeNull();
  });
});

describe("verifyBase58Check", () => {
  it("validates the Bitcoin genesis block coinbase address", () => {
    expect(verifyBase58Check("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")).toBe(true);
  });

  it("rejects a single mutated character", () => {
    expect(verifyBase58Check("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb")).toBe(false);
  });
});

describe("verifyBech32", () => {
  it("validates the BIP-173 segwit v0 test vector as bech32", () => {
    expect(verifyBech32("BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4")).toBe("bech32");
  });

  it("validates the BIP-350 taproot test vector as bech32m", () => {
    expect(
      verifyBech32("bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297")
    ).toBe("bech32m");
  });

  it("rejects a mutated checksum", () => {
    expect(verifyBech32("BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T5")).toBe(false);
  });

  it("rejects mixed-case input", () => {
    expect(verifyBech32("bc1Qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4")).toBe(false);
  });
});

describe("verifyEip55", () => {
  it("validates known EIP-55 checksum test vectors", () => {
    expect(verifyEip55("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed")).toBe(true);
    expect(verifyEip55("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359")).toBe(true);
    expect(verifyEip55("0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB")).toBe(true);
    expect(verifyEip55("0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb")).toBe(true);
  });

  it("rejects a mis-cased address", () => {
    expect(verifyEip55("0x5aaeb6053F3E94C9b9A09f33669435E7Ef1BeAed")).toBe(false);
  });

  it("returns undefined for all-lowercase/all-uppercase addresses (no checksum to check)", () => {
    expect(verifyEip55("0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed")).toBeUndefined();
    expect(verifyEip55("0x5AAEB6053F3E94C9B9A09F33669435E7EF1BEAED")).toBeUndefined();
  });
});
