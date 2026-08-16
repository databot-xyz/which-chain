import type { AddressPattern } from "../types";

/**
 * Bitcoin Cash CashAddr format, with or without the "bitcoincash:" prefix.
 * P2PKH/P2SH addresses are 42 base32 characters starting with "q" or "p".
 */
export const CASHADDR_PATTERN: AddressPattern = {
  full: /^(?:bitcoincash:)?[qp][a-z0-9]{41}$/i,
  partial: /^(?:bitcoincash:)?[qp][a-z0-9]{0,41}$/i,
};
