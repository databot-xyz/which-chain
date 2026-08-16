import { describe, expect, it } from "vitest";
import {
  detectChains,
  getAddressFamily,
  isValidAddressFor,
  listChains,
  registerChain,
} from "../src/index";

const EVM_ADDRESS = "0x0123456789abcdef0123456789abcdef01234567";
const SOLANA_ADDRESS = "So11111111111111111111111111111111111111112";

describe("detectChains", () => {
  it("returns every EVM chain for a standard 0x address - shape can't disambiguate them", () => {
    const results = detectChains(EVM_ADDRESS);
    const ids = results.map((result) => result.chainId);

    expect(ids).toContain("ethereum");
    expect(ids).toContain("bsc");
    expect(ids).toContain("base");
    expect(ids).toContain("robinhood");
    expect(results.every((result) => result.family === "evm")).toBe(true);
    expect(results.length).toBeGreaterThan(20);
  });

  it("returns solana only for a base58 solana-shaped address", () => {
    const results = detectChains(SOLANA_ADDRESS);

    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({ chainId: "solana", family: "solana" });
  });

  it("trims surrounding whitespace before matching", () => {
    expect(detectChains(`  ${EVM_ADDRESS}  `).map((r) => r.chainId)).toContain(
      "ethereum"
    );
  });

  it("returns an empty array for empty/blank input", () => {
    expect(detectChains("")).toEqual([]);
    expect(detectChains("   ")).toEqual([]);
  });

  it("returns an empty array for input that matches nothing", () => {
    expect(detectChains("not-an-address")).toEqual([]);
  });

  it("documents a known cross-family overlap: a valid Tron address also shape-matches Solana", () => {
    // Both are base58 with overlapping length ranges (Tron is fixed at 34
    // chars, Solana spans 32-44) and there's no checksum check to tell them
    // apart by shape alone. This is expected - see getAddressFamily's docs.
    const tronAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    const ids = detectChains(tronAddress).map((result) => result.chainId);

    expect(ids).toContain("tron");
    expect(ids).toContain("solana");
    expect(isValidAddressFor(tronAddress, "tron")).toBe(true);
  });
});

describe("getAddressFamily", () => {
  it("returns the family for a matching address", () => {
    expect(getAddressFamily(SOLANA_ADDRESS)).toBe("solana");
    expect(getAddressFamily(EVM_ADDRESS)).toBe("evm");
  });

  it("returns null when nothing matches", () => {
    expect(getAddressFamily("nope")).toBeNull();
  });
});

describe("isValidAddressFor", () => {
  it("validates an address against one specific chain", () => {
    expect(isValidAddressFor(EVM_ADDRESS, "ethereum")).toBe(true);
    expect(isValidAddressFor(EVM_ADDRESS, "solana")).toBe(false);
    expect(isValidAddressFor(SOLANA_ADDRESS, "solana")).toBe(true);
  });

  it("resolves chain aliases", () => {
    expect(isValidAddressFor(EVM_ADDRESS, "eth")).toBe(true);
    expect(isValidAddressFor(SOLANA_ADDRESS, "sol")).toBe(true);
  });

  it("returns false for an unknown chain id", () => {
    expect(isValidAddressFor(EVM_ADDRESS, "not-a-real-chain")).toBe(false);
  });
});

describe("listChains", () => {
  it("includes all built-in chains", () => {
    const ids = listChains().map((chain) => chain.id);

    expect(ids).toContain("ethereum");
    expect(ids).toContain("solana");
    expect(ids).toContain("bitcoin");
    expect(ids.length).toBeGreaterThanOrEqual(40);
  });
});

describe("registerChain", () => {
  it("adds a brand new chain that becomes detectable and validatable", () => {
    registerChain({
      id: "test-chain",
      name: "Test Chain",
      family: "evm",
      pattern: {
        full: /^testchain_[a-z0-9]{6}$/,
        partial: /^testchain_[a-z0-9]{0,6}$/,
      },
      aliases: ["tc"],
    });

    expect(isValidAddressFor("testchain_abc123", "test-chain")).toBe(true);
    expect(isValidAddressFor("testchain_abc123", "tc")).toBe(true);
    expect(
      detectChains("testchain_abc123").map((result) => result.chainId)
    ).toContain("test-chain");
  });

  it("overrides a built-in chain when the same id is reused", () => {
    registerChain({
      id: "kaspa",
      name: "Kaspa (custom)",
      family: "kaspa",
      pattern: { full: /^custom-kaspa$/, partial: /^custom-kaspa$/ },
    });

    const chain = listChains().find((entry) => entry.id === "kaspa");

    expect(chain?.name).toBe("Kaspa (custom)");
    expect(isValidAddressFor("custom-kaspa", "kaspa")).toBe(true);
  });
});
