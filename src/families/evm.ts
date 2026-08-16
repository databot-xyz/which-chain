import type { AddressPattern } from "../types";

/**
 * Standard 20-byte EVM address. Shared by every EVM chain (Ethereum, BSC,
 * Base, Arbitrum, Polygon, ...) - the shape is identical across all of them,
 * so this pattern alone can never disambiguate which specific EVM chain an
 * address belongs to.
 */
export const EVM_PATTERN: AddressPattern = {
  full: /^0x[a-fA-F0-9]{40}$/,
  partial: /^0x[a-fA-F0-9]{4,40}$/,
};
