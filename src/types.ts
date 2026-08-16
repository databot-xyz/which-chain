export type Family =
  | "evm"
  | "evm-extended-hex"
  | "solana"
  | "tron"
  | "ton"
  | "xrpl"
  | "bech32"
  | "cardano"
  | "polkadot"
  | "near"
  | "hedera"
  | "kaspa"
  | "bitcoin-like"
  | "stellar"
  | "algorand"
  | "filecoin"
  | "cashaddr"
  | "tezos";

export type AddressPattern = {
  /** Matches a well-formed, complete address. */
  full: RegExp;
  /** Matches a partial/prefix-length address - used for lookup/search inputs. */
  partial: RegExp;
};

/**
 * Result of a checksum check: "valid"/"invalid" mean the chain has a
 * checksum scheme and it did/didn't verify; "unknown" means either the chain
 * has no checksum scheme this package implements, or the specific address
 * has no embedded checksum to check (e.g. an all-lowercase EVM address).
 */
export type ChecksumStatus = "valid" | "invalid" | "unknown";

export type ChainDefinition = {
  /** Stable identifier, e.g. "ethereum", "bsc", "robinhood". */
  id: string;
  /** Human-readable name, e.g. "Ethereum". */
  name: string;
  family: Family;
  pattern: AddressPattern;
  /** Other names/spellings that should resolve to this chain, e.g. ["eth", "erc20"]. */
  aliases?: string[];
  /**
   * Optional checksum verifier. Returns true/false when the address carries
   * a checksum this package can verify, or undefined when it doesn't apply
   * (no checksum scheme, or this specific address has no case/checksum data).
   */
  verifyChecksum?: (address: string) => boolean | undefined;
};

export type DetectResult = {
  chainId: string;
  name: string;
  family: Family;
  checksum: ChecksumStatus;
};
