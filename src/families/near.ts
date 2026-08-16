import type { AddressPattern } from "../types";

/**
 * NEAR accounts are either a 64-char implicit hex account, or a named
 * account like "token.near" / "sub.account.testnet".
 */
export const NEAR_PATTERN: AddressPattern = {
  full: /^(?:[a-f0-9]{64}|(?:[a-z0-9_-]+\.)+(?:near|testnet))$/i,
  partial: /^(?:[a-f0-9]{4,64}|(?:[a-z0-9_-]+\.)+(?:near|testnet)?)$/i,
};
