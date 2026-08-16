import type { AddressPattern } from "../types";

/** Algorand address: 58-char RFC4648 base32 (public key + 4-byte checksum), no padding. */
export const ALGORAND_PATTERN: AddressPattern = {
  full: /^[A-Z2-7]{58}$/,
  partial: /^[A-Z2-7]{4,58}$/,
};
