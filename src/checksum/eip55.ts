import { keccak256 } from "./keccak256";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verifies an EIP-55 mixed-case checksum address. Returns undefined for
 * all-lowercase/all-uppercase addresses, since EIP-55 has no way to tell
 * whether those were ever checksummed at all.
 */
export function verifyEip55(address: string): boolean | undefined {
  const match = /^0x([a-fA-F0-9]{40})$/.exec(address.trim());
  if (!match) return undefined;

  const hex = match[1];
  const lower = hex.toLowerCase();
  if (hex === lower || hex === hex.toUpperCase()) return undefined;

  const hash = bytesToHex(keccak256(new TextEncoder().encode(lower)));

  for (let i = 0; i < lower.length; i++) {
    const char = hex[i];
    if (!/[a-f]/i.test(char)) continue;

    const shouldBeUpper = parseInt(hash[i], 16) >= 8;
    const isUpper = char === char.toUpperCase();
    if (isUpper !== shouldBeUpper) return false;
  }

  return true;
}
