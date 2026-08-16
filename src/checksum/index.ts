export { verifyBase58Check } from "./base58check";
export { verifyBech32 } from "./bech32";
export { verifyEip55 } from "./eip55";

import { verifyBase58Check } from "./base58check";
import { verifyBech32 } from "./bech32";

/**
 * Combined checksum verifier for chains that split into a base58check branch
 * (legacy/P2SH addresses) and a bech32 branch (native segwit), e.g. Bitcoin
 * ("1.../3..." vs "bc1...") and Litecoin ("L.../M.../3..." vs "ltc1...").
 */
export function verifyBitcoinLikeChecksum(
  segwitPrefix: string
): (address: string) => boolean | undefined {
  return (address: string): boolean | undefined => {
    const trimmed = address.trim();

    if (trimmed.toLowerCase().startsWith(segwitPrefix)) {
      return verifyBech32(trimmed) !== false;
    }

    return verifyBase58Check(trimmed);
  };
}

/** Checksum verifier for plain bech32/bech32m address families (no base58check branch). */
export function verifyBech32Checksum(address: string): boolean | undefined {
  return verifyBech32(address.trim()) !== false;
}
