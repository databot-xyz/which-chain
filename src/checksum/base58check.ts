import { decodeBase58 } from "./base58";
import { sha256 } from "./sha256";

/**
 * Verifies a base58check-encoded address (Bitcoin/Litecoin/Dogecoin/Tron/Tezos
 * style): last 4 bytes must equal the first 4 bytes of double-SHA256(payload).
 * Returns undefined if the string can't be decoded/isn't long enough to carry
 * a checksum at all.
 */
export function verifyBase58Check(address: string): boolean | undefined {
  const decoded = decodeBase58(address.trim());
  if (!decoded || decoded.length < 5) return undefined;

  const payload = decoded.subarray(0, decoded.length - 4);
  const checksum = decoded.subarray(decoded.length - 4);
  const hash = sha256(sha256(payload));

  for (let i = 0; i < 4; i++) {
    if (checksum[i] !== hash[i]) return false;
  }
  return true;
}
