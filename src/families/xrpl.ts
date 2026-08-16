import type { AddressPattern } from "../types";

/** Classic XRPL address form: base58, starts with "r". */
export const XRPL_PATTERN: AddressPattern = {
  full: /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/,
  partial: /^r[1-9A-HJ-NP-Za-km-z]{8,34}$/,
};
