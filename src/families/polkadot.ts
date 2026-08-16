import type { AddressPattern } from "../types";

/** SS58-encoded Polkadot addresses. */
export const POLKADOT_PATTERN: AddressPattern = {
  full: /^[1-9A-HJ-NP-Za-km-z]{46,48}$/,
  partial: /^[1-9A-HJ-NP-Za-km-z]{8,48}$/,
};
