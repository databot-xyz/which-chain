import type { AddressPattern } from "../types";

/** Stellar StrKey ed25519 public key ("G..."): 56-char RFC4648 base32, no padding. */
export const STELLAR_PATTERN: AddressPattern = {
  full: /^G[A-Z2-7]{55}$/,
  partial: /^G[A-Z2-7]{0,55}$/,
};
