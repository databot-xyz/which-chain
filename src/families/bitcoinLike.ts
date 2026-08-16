import type { AddressPattern } from "../types";

/** P2PKH ("1..."), P2SH ("3...") or native segwit bech32 ("bc1..."). */
export const BITCOIN_PATTERN: AddressPattern = {
  full: /^(?:[13][1-9A-HJ-NP-Za-km-z]{25,34}|bc1[ac-hj-np-z02-9]{11,71})$/i,
  partial: /^(?:[13][1-9A-HJ-NP-Za-km-z]{3,34}|bc1[ac-hj-np-z02-9]{3,71})$/i,
};

/** P2PKH ("L.../M..."), P2SH ("3...") or native segwit bech32 ("ltc1..."). */
export const LITECOIN_PATTERN: AddressPattern = {
  full: /^(?:[LM3][1-9A-HJ-NP-Za-km-z]{26,33}|ltc1[ac-hj-np-z02-9]{11,71})$/i,
  partial: /^(?:[LM3][1-9A-HJ-NP-Za-km-z]{3,33}|ltc1[ac-hj-np-z02-9]{3,71})$/i,
};

/** P2PKH ("D...") or P2SH ("9.../A..."). Dogecoin has no native segwit. */
export const DOGECOIN_PATTERN: AddressPattern = {
  full: /^[DA9][1-9A-HJ-NP-Za-km-z]{25,34}$/,
  partial: /^[DA9][1-9A-HJ-NP-Za-km-z]{3,34}$/,
};
