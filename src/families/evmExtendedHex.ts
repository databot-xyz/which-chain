import type { AddressPattern } from "../types";

/**
 * Aptos, Sui and Starknet use 0x-prefixed addresses longer than EVM's 20
 * bytes (up to 32 bytes / 64 hex chars, often not zero-padded). The lower
 * bound is deliberately set above 40 hex chars so this never overlaps with
 * a standard EVM address - `partial` stays permissive since it's meant for
 * prefix/lookup matching, not final classification.
 */
export const EVM_EXTENDED_HEX_PATTERN: AddressPattern = {
  full: /^0x[a-fA-F0-9]{41,64}$/,
  partial: /^0x[a-fA-F0-9]{1,64}$/,
};
