import { describe, expect, it } from "vitest";
import { detectChains, isValidAddressFor, verifyChecksum } from "../../src/index";

describe("verifyChecksum", () => {
  it("validates a real Bitcoin legacy (base58check) address", () => {
    expect(verifyChecksum("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "bitcoin")).toBe("valid");
  });

  it("flags a mutated Bitcoin address as invalid", () => {
    expect(verifyChecksum("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb", "bitcoin")).toBe("invalid");
  });

  it("validates a real Bitcoin native segwit (bech32) address", () => {
    expect(verifyChecksum("BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4", "bitcoin")).toBe(
      "valid"
    );
  });

  it("validates a real Bitcoin taproot (bech32m) address", () => {
    expect(
      verifyChecksum(
        "bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297",
        "bitcoin"
      )
    ).toBe("valid");
  });

  it("validates a checksum-correct Litecoin legacy address", () => {
    expect(verifyChecksum("LKEDxZqyR9oBWNVM13GozYTAV7tyDLhtnj", "litecoin")).toBe("valid");
  });

  it("validates a checksum-correct Dogecoin address", () => {
    expect(verifyChecksum("D59NEcUnduTQnZynZVH5GHZ1A3FzUAvTWZ", "dogecoin")).toBe("valid");
  });

  it("validates a real Tron address", () => {
    expect(verifyChecksum("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "tron")).toBe("valid");
  });

  it("validates checksum-correct Cosmos and Cardano bech32 addresses", () => {
    expect(
      verifyChecksum(
        "cosmos1qv9pzxqlyckngw6zf9g9whn9d3eh4qvg37tfmf9tk2uup37w6hwqn7gzfz",
        "cosmos"
      )
    ).toBe("valid");
    expect(
      verifyChecksum("addr1qv9pzxqlyckngw6zf9g9whn9d3eh4qvg37tfmf9tk2uup37w6hwqm23r8w", "cardano")
    ).toBe("valid");
  });

  it("flags a mutated bech32 address as invalid", () => {
    expect(
      verifyChecksum(
        "cosmos1qv9pzxqlyckngw6zf9g9whn9d3eh4qvg37tfmf9tk2uup37w6hwqn7gzfy",
        "cosmos"
      )
    ).toBe("invalid");
  });

  it("validates a checksum-correct Tezos address", () => {
    expect(verifyChecksum("tz1LHTY6HZLuMRGJq6jfCxD6ug8jGsM6nm69", "tezos")).toBe("valid");
  });

  it("validates EIP-55 mixed-case EVM addresses across every EVM chain", () => {
    expect(verifyChecksum("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ethereum")).toBe(
      "valid"
    );
    expect(verifyChecksum("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "bsc")).toBe("valid");
    expect(verifyChecksum("0x5aaeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ethereum")).toBe(
      "invalid"
    );
  });

  it("returns unknown for all-lowercase EVM addresses (no case to check)", () => {
    expect(verifyChecksum("0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed", "ethereum")).toBe(
      "unknown"
    );
  });

  it("returns unknown for chains without a checksum scheme, or unrecognized chains", () => {
    expect(verifyChecksum("So11111111111111111111111111111111111111112", "solana")).toBe(
      "unknown"
    );
    expect(verifyChecksum("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "not-a-chain")).toBe(
      "unknown"
    );
  });

  it("does not gate isValidAddressFor - shape validity is unaffected by checksum", () => {
    expect(isValidAddressFor("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb", "bitcoin")).toBe(true);
  });
});

describe("detectChains checksum field", () => {
  it("marks the Tron match valid and the overlapping Solana match unknown", () => {
    const results = detectChains("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
    const tron = results.find((r) => r.chainId === "tron");
    const solana = results.find((r) => r.chainId === "solana");

    expect(tron?.checksum).toBe("valid");
    expect(solana?.checksum).toBe("unknown");
  });
});
