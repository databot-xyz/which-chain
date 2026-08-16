import type { AddressPattern } from "../types";

export const TRON_PATTERN: AddressPattern = {
  full: /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
  partial: /^T[1-9A-HJ-NP-Za-km-z]{3,33}$/,
};
