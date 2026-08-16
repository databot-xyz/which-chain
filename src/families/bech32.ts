import type { AddressPattern } from "../types";

/**
 * Cosmos-family bech32 addresses (Cosmos Hub, Osmosis, Injective, Celestia,
 * Sei's native bech32 form, ...), e.g. "osmo1...", "inj1...". The
 * human-readable prefix (HRP) varies by chain, so it's left unconstrained
 * here - this pattern matches the shape shared by the whole family.
 */
export const BECH32_PATTERN: AddressPattern = {
  full: /^[a-z]+1[ac-hj-np-z02-9]{20,80}$/i,
  partial: /^[a-z]+1[ac-hj-np-z02-9]{8,80}$/i,
};
