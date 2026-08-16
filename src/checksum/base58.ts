const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/** Decodes a base58 (Bitcoin alphabet) string to bytes, or null if it contains invalid characters. */
export function decodeBase58(input: string): Uint8Array | null {
  if (input.length === 0) return new Uint8Array(0);

  let num = 0n;
  for (const char of input) {
    const digit = ALPHABET.indexOf(char);
    if (digit === -1) return null;
    num = num * 58n + BigInt(digit);
  }

  const bytes: number[] = [];
  while (num > 0n) {
    bytes.unshift(Number(num & 0xffn));
    num >>= 8n;
  }

  let leadingZeros = 0;
  for (const char of input) {
    if (char !== "1") break;
    leadingZeros++;
  }

  return new Uint8Array([...new Array(leadingZeros).fill(0), ...bytes]);
}
