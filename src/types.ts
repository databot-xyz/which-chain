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
  | "bitcoin-like";

export type AddressPattern = {
  /** Matches a well-formed, complete address. */
  full: RegExp;
  /** Matches a partial/prefix-length address - used for lookup/search inputs. */
  partial: RegExp;
};

export type ChainDefinition = {
  /** Stable identifier, e.g. "ethereum", "bsc", "robinhood". */
  id: string;
  /** Human-readable name, e.g. "Ethereum". */
  name: string;
  family: Family;
  pattern: AddressPattern;
  /** Other names/spellings that should resolve to this chain, e.g. ["eth", "erc20"]. */
  aliases?: string[];
};

export type DetectResult = {
  chainId: string;
  name: string;
  family: Family;
};
