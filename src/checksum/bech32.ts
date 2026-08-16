const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
const BECH32_CONST = 1;
const BECH32M_CONST = 0x2bc830a3;

function polymod(values: number[]): number {
  let chk = 1;
  for (const v of values) {
    const top = chk >>> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) {
      if ((top >>> i) & 1) chk ^= GEN[i];
    }
  }
  return chk >>> 0;
}

function hrpExpand(hrp: string): number[] {
  const result: number[] = [];
  for (const c of hrp) result.push(c.charCodeAt(0) >> 5);
  result.push(0);
  for (const c of hrp) result.push(c.charCodeAt(0) & 31);
  return result;
}

/**
 * Verifies a bech32 (BIP-173) or bech32m (BIP-350) checksum, e.g. Bitcoin
 * native segwit ("bc1...") or Cosmos-family addresses ("cosmos1...").
 * Returns which variant validated, or false if neither does.
 */
export function verifyBech32(address: string): "bech32" | "bech32m" | false {
  const trimmed = address.trim();
  const lower = trimmed.toLowerCase();
  if (trimmed !== lower && trimmed !== trimmed.toUpperCase()) return false;

  const pos = lower.lastIndexOf("1");
  if (pos < 1 || pos + 7 > lower.length) return false;

  const hrp = lower.slice(0, pos);
  const dataPart = lower.slice(pos + 1);
  const data: number[] = [];
  for (const c of dataPart) {
    const idx = CHARSET.indexOf(c);
    if (idx === -1) return false;
    data.push(idx);
  }

  const chk = polymod(hrpExpand(hrp).concat(data));
  if (chk === BECH32_CONST) return "bech32";
  if (chk === BECH32M_CONST) return "bech32m";
  return false;
}
