import type { AddressPattern } from "../types";

export const SOLANA_PATTERN: AddressPattern = {
  full: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  partial: /^[1-9A-Za-z]{8,44}$/,
};
