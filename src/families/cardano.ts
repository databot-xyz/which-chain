import type { AddressPattern } from "../types";

/** Cardano's bech32 addresses always carry the "addr1" prefix. */
export const CARDANO_PATTERN: AddressPattern = {
  full: /^addr1[ac-hj-np-z02-9]{20,100}$/i,
  partial: /^addr1[ac-hj-np-z02-9]{8,100}$/i,
};
