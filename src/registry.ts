import type { ChainDefinition } from "./types";
import { CHAINS } from "./chains";

const registeredChains: ChainDefinition[] = [...CHAINS];
const chainsById = new Map<string, ChainDefinition>();

function indexChain(chain: ChainDefinition): void {
  chainsById.set(chain.id.toLowerCase(), chain);
  chain.aliases?.forEach((alias) => chainsById.set(alias.toLowerCase(), chain));
}

registeredChains.forEach(indexChain);

/** All chains currently known to the library (built-in + registered). */
export function listChains(): ChainDefinition[] {
  return [...registeredChains];
}

/**
 * Add a custom chain, or override a built-in one by reusing its `id`.
 * Useful for chains this package doesn't ship with yet.
 */
export function registerChain(definition: ChainDefinition): void {
  const existingIndex = registeredChains.findIndex(
    (chain) => chain.id.toLowerCase() === definition.id.toLowerCase()
  );

  if (existingIndex >= 0) {
    registeredChains[existingIndex] = definition;
  } else {
    registeredChains.push(definition);
  }

  indexChain(definition);
}

export function getChainById(idOrAlias: string): ChainDefinition | undefined {
  return chainsById.get(idOrAlias.trim().toLowerCase());
}
