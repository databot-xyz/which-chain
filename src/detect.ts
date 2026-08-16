import type { DetectResult, Family } from "./types";
import { listChains, getChainById } from "./registry";

/**
 * Every chain whose address shape matches. Standard EVM chains are
 * indistinguishable by shape alone, so a valid `0x...` address will match
 * every EVM chain in the registry at once - that's expected, not a bug.
 */
export function detectChains(address: string): DetectResult[] {
  const normalized = address.trim();

  if (!normalized) {
    return [];
  }

  return listChains()
    .filter((chain) => chain.pattern.full.test(normalized))
    .map((chain) => ({ chainId: chain.id, name: chain.name, family: chain.family }));
}

/**
 * The address's shape family (e.g. "evm", "solana", "bech32"), or null if
 * nothing matches. When an address matches chains from more than one family,
 * this returns the first match only, in registry order - that order is NOT
 * a ranking of likelihood. This happens more than you'd expect: Solana's
 * pattern is a wide, unconstrained base58 range (32-44 chars), so it also
 * matches plenty of valid Tron, Bitcoin, Litecoin and XRPL addresses at
 * overlapping lengths. Without checksum validation there's no way to break
 * that tie correctly - use `detectChains` and/or `isValidAddressFor` when
 * you need to know (or already know) the specific chain.
 */
export function getAddressFamily(address: string): Family | null {
  const [firstMatch] = detectChains(address);

  return firstMatch ? firstMatch.family : null;
}

/** Does `address` match the shape expected for `chainId` (or one of its aliases)? */
export function isValidAddressFor(address: string, chainId: string): boolean {
  const chain = getChainById(chainId);

  if (!chain) {
    return false;
  }

  return chain.pattern.full.test(address.trim());
}
