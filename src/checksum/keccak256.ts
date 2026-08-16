const MASK64 = (1n << 64n) - 1n;

// Rho rotation offsets, indexed by lane position p = x + 5*y.
const RHO = [
  0, 1, 62, 28, 27,
  36, 44, 6, 55, 20,
  3, 10, 43, 25, 39,
  41, 45, 15, 21, 8,
  18, 2, 61, 56, 14,
];

const RC = [
  0x0000000000000001n, 0x0000000000008082n, 0x800000000000808an, 0x8000000080008000n,
  0x000000000000808bn, 0x0000000080000001n, 0x8000000080008081n, 0x8000000000008009n,
  0x000000000000008an, 0x0000000000000088n, 0x0000000080008009n, 0x000000008000000an,
  0x000000008000808bn, 0x800000000000008bn, 0x8000000000008089n, 0x8000000000008003n,
  0x8000000000008002n, 0x8000000000000080n, 0x000000000000800an, 0x800000008000000an,
  0x8000000080008081n, 0x8000000000008080n, 0x0000000080000001n, 0x8000000080008008n,
];

function rotl64(x: bigint, n: number): bigint {
  if (n === 0) return x & MASK64;
  const nn = BigInt(n);
  return ((x << nn) | (x >> (64n - nn))) & MASK64;
}

function keccakF1600(state: bigint[]): void {
  for (let round = 0; round < 24; round++) {
    const C: bigint[] = new Array(5).fill(0n);
    for (let x = 0; x < 5; x++) {
      C[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20];
    }
    const D: bigint[] = new Array(5).fill(0n);
    for (let x = 0; x < 5; x++) {
      D[x] = C[(x + 4) % 5] ^ rotl64(C[(x + 1) % 5], 1);
    }
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        state[x + 5 * y] ^= D[x];
      }
    }

    const B: bigint[] = new Array(25).fill(0n);
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const newX = y;
        const newY = (2 * x + 3 * y) % 5;
        B[newX + 5 * newY] = rotl64(state[x + 5 * y], RHO[x + 5 * y]);
      }
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        state[x + 5 * y] =
          (B[x + 5 * y] ^ (~B[((x + 1) % 5) + 5 * y] & B[((x + 2) % 5) + 5 * y])) & MASK64;
      }
    }

    state[0] ^= RC[round];
  }
}

/**
 * Pure-JS, dependency-free Keccak-256 (the original Keccak padding used by
 * Ethereum, NOT NIST SHA3-256's padding). Used for EIP-55 checksum casing.
 */
export function keccak256(message: Uint8Array): Uint8Array {
  const rate = 136; // bytes (1088 bits)
  const state: bigint[] = new Array(25).fill(0n);

  const numBlocks = Math.floor(message.length / rate) + 1;
  const paddedLen = numBlocks * rate;
  const padded = new Uint8Array(paddedLen);
  padded.set(message);
  padded[message.length] = 0x01;
  padded[paddedLen - 1] |= 0x80;

  for (let offset = 0; offset < paddedLen; offset += rate) {
    for (let i = 0; i < rate / 8; i++) {
      let lane = 0n;
      for (let b = 7; b >= 0; b--) {
        lane = (lane << 8n) | BigInt(padded[offset + i * 8 + b]);
      }
      state[i] ^= lane;
    }
    keccakF1600(state);
  }

  const out = new Uint8Array(32);
  for (let i = 0; i < 4; i++) {
    let lane = state[i];
    for (let b = 0; b < 8; b++) {
      out[i * 8 + b] = Number(lane & 0xffn);
      lane >>= 8n;
    }
  }
  return out;
}
