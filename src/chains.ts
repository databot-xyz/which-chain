import type { ChainDefinition } from "./types";
import { EVM_PATTERN } from "./families/evm";
import { EVM_EXTENDED_HEX_PATTERN } from "./families/evmExtendedHex";
import { SOLANA_PATTERN } from "./families/solana";
import { TRON_PATTERN } from "./families/tron";
import { TON_PATTERN } from "./families/ton";
import { XRPL_PATTERN } from "./families/xrpl";
import { BECH32_PATTERN } from "./families/bech32";
import { CARDANO_PATTERN } from "./families/cardano";
import { POLKADOT_PATTERN } from "./families/polkadot";
import { NEAR_PATTERN } from "./families/near";
import { HEDERA_PATTERN } from "./families/hedera";
import { KASPA_PATTERN } from "./families/kaspa";
import {
  BITCOIN_PATTERN,
  LITECOIN_PATTERN,
  DOGECOIN_PATTERN,
} from "./families/bitcoinLike";
import { STELLAR_PATTERN } from "./families/stellar";
import { ALGORAND_PATTERN } from "./families/algorand";
import { FILECOIN_PATTERN } from "./families/filecoin";
import { CASHADDR_PATTERN } from "./families/cashaddr";
import { TEZOS_PATTERN } from "./families/tezos";
import {
  verifyEip55,
  verifyBase58Check,
  verifyBitcoinLikeChecksum,
  verifyBech32Checksum,
} from "./checksum";

function evmChain(id: string, name: string, aliases?: string[]): ChainDefinition {
  return { id, name, family: "evm", pattern: EVM_PATTERN, aliases, verifyChecksum: verifyEip55 };
}

/**
 * Every chain this package can recognize. Standard EVM chains all share the
 * exact same address shape (see families/evm.ts) - they're listed
 * individually here so `isValidAddressFor` and `listChains` can be scoped by
 * chain id, but `detectChains` will always return every EVM chain together
 * for a given address, since shape alone can't tell them apart.
 */
export const CHAINS: ChainDefinition[] = [
  evmChain("ethereum", "Ethereum", ["eth", "erc20"]),
  evmChain("bsc", "BNB Smart Chain", ["bnb", "binance smart chain", "binance_smart_chain"]),
  evmChain("base", "Base"),
  evmChain("arbitrum", "Arbitrum"),
  evmChain("avalanche", "Avalanche"),
  evmChain("polygon", "Polygon"),
  evmChain("optimism", "Optimism"),
  evmChain("fantom", "Fantom"),
  evmChain("gnosis", "Gnosis Chain"),
  evmChain("cronos", "Cronos"),
  evmChain("blast", "Blast"),
  evmChain("linea", "Linea"),
  evmChain("scroll", "Scroll"),
  evmChain("zksync", "zkSync"),
  evmChain("metis", "Metis"),
  evmChain("boba", "Boba"),
  evmChain("immutable", "Immutable"),
  evmChain("worldchain", "Worldchain"),
  evmChain("mode", "Mode"),
  evmChain("berachain", "Berachain"),
  evmChain("hyperliquid", "Hyperliquid"),
  evmChain("pulsechain", "PulseChain"),
  evmChain("abstract", "Abstract"),
  evmChain("alephzero", "Aleph Zero"),
  evmChain("apechain", "ApeChain"),
  evmChain("beam", "Beam"),
  evmChain("ink", "Ink"),
  evmChain("robinhood", "Robinhood"),
  evmChain("sonic", "Sonic"),
  evmChain("seiv2", "Sei"),

  {
    id: "aptos",
    name: "Aptos",
    family: "evm-extended-hex",
    pattern: EVM_EXTENDED_HEX_PATTERN,
  },
  {
    id: "sui",
    name: "Sui",
    family: "evm-extended-hex",
    pattern: EVM_EXTENDED_HEX_PATTERN,
  },
  {
    id: "starknet",
    name: "Starknet",
    family: "evm-extended-hex",
    pattern: EVM_EXTENDED_HEX_PATTERN,
  },

  {
    id: "solana",
    name: "Solana",
    family: "solana",
    pattern: SOLANA_PATTERN,
    aliases: ["sol"],
  },
  {
    id: "tron",
    name: "Tron",
    family: "tron",
    pattern: TRON_PATTERN,
    verifyChecksum: verifyBase58Check,
  },
  {
    id: "ton",
    name: "TON",
    family: "ton",
    pattern: TON_PATTERN,
  },
  {
    id: "xrpl",
    name: "XRP Ledger",
    family: "xrpl",
    pattern: XRPL_PATTERN,
  },

  {
    id: "cosmos",
    name: "Cosmos Hub",
    family: "bech32",
    pattern: BECH32_PATTERN,
    verifyChecksum: verifyBech32Checksum,
  },
  {
    id: "osmosis",
    name: "Osmosis",
    family: "bech32",
    pattern: BECH32_PATTERN,
    verifyChecksum: verifyBech32Checksum,
  },
  {
    id: "injective",
    name: "Injective",
    family: "bech32",
    pattern: BECH32_PATTERN,
    verifyChecksum: verifyBech32Checksum,
  },
  {
    id: "celestia",
    name: "Celestia",
    family: "bech32",
    pattern: BECH32_PATTERN,
    verifyChecksum: verifyBech32Checksum,
  },

  {
    id: "cardano",
    name: "Cardano",
    family: "cardano",
    pattern: CARDANO_PATTERN,
    verifyChecksum: verifyBech32Checksum,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    family: "polkadot",
    pattern: POLKADOT_PATTERN,
  },
  {
    id: "near",
    name: "NEAR",
    family: "near",
    pattern: NEAR_PATTERN,
  },
  {
    id: "hedera",
    name: "Hedera",
    family: "hedera",
    pattern: HEDERA_PATTERN,
  },
  {
    id: "kaspa",
    name: "Kaspa",
    family: "kaspa",
    pattern: KASPA_PATTERN,
  },

  {
    id: "bitcoin",
    name: "Bitcoin",
    family: "bitcoin-like",
    pattern: BITCOIN_PATTERN,
    aliases: ["btc"],
    verifyChecksum: verifyBitcoinLikeChecksum("bc1"),
  },
  {
    id: "litecoin",
    name: "Litecoin",
    family: "bitcoin-like",
    pattern: LITECOIN_PATTERN,
    aliases: ["ltc"],
    verifyChecksum: verifyBitcoinLikeChecksum("ltc1"),
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    family: "bitcoin-like",
    pattern: DOGECOIN_PATTERN,
    aliases: ["doge"],
    verifyChecksum: verifyBase58Check,
  },

  {
    id: "bitcoincash",
    name: "Bitcoin Cash",
    family: "cashaddr",
    pattern: CASHADDR_PATTERN,
    aliases: ["bch"],
  },
  {
    id: "tezos",
    name: "Tezos",
    family: "tezos",
    pattern: TEZOS_PATTERN,
    aliases: ["xtz"],
    verifyChecksum: verifyBase58Check,
  },
  {
    id: "stellar",
    name: "Stellar",
    family: "stellar",
    pattern: STELLAR_PATTERN,
    aliases: ["xlm"],
  },
  {
    id: "algorand",
    name: "Algorand",
    family: "algorand",
    pattern: ALGORAND_PATTERN,
    aliases: ["algo"],
  },
  {
    id: "filecoin",
    name: "Filecoin",
    family: "filecoin",
    pattern: FILECOIN_PATTERN,
    aliases: ["fil"],
  },
];
