import type { AddressPattern } from "../types";

/** Tezos base58check addresses: implicit accounts ("tz1/tz2/tz3...") or originated contracts ("KT1..."). */
export const TEZOS_PATTERN: AddressPattern = {
  full: /^(?:tz1|tz2|tz3|KT1)[1-9A-HJ-NP-Za-km-z]{33}$/,
  partial: /^(?:tz1|tz2|tz3|KT1)[1-9A-HJ-NP-Za-km-z]{0,33}$/,
};
