import type { AddressPattern } from "../types";

/**
 * Filecoin addresses, mainnet ("f...") or testnet ("t..."), across the
 * protocol variants: 0 = ID (decimal), 1 = secp256k1, 2 = actor, 3 = BLS,
 * 4 = delegated (f4/t4 namespace + sub-address). Protocols 1-3 are base32
 * (lowercase, no padding); lengths below are approximate since payload sizes
 * differ per protocol.
 */
export const FILECOIN_PATTERN: AddressPattern = {
  full: /^[ft](?:0[0-9]{1,20}|1[a-z2-7]{38,40}|2[a-z2-7]{38,40}|3[a-z2-7]{82,86}|4[a-z0-9]{1,50})$/,
  partial: /^[ft](?:0[0-9]{0,20}|1[a-z2-7]{0,40}|2[a-z2-7]{0,40}|3[a-z2-7]{0,86}|4[a-z0-9]{0,50})$/,
};
