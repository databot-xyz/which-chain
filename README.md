# which-chain

Zero-dependency blockchain address shape detection. Given a raw address string, figure out which chain(s) it could belong to, and validate it against a specific chain.

```ts
import { detectChains, getAddressFamily, isValidAddressFor } from "which-chain";

detectChains("So11111111111111111111111111111111111111112");
// -> [{ chainId: "solana", name: "Solana", family: "solana" }]

isValidAddressFor("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "tron");
// -> true

getAddressFamily("addr1023456789acdefghjklmnpqrs");
// -> "cardano"
```

## Install

```
npm install which-chain
```

## Important: this is shape detection, not checksum validation

`which-chain` checks whether a string is **shaped like** a valid address for a chain (correct prefix, character set, length) using regular expressions only. It does **not** verify checksums (no EIP-55 for EVM, no base58check checksum, no bech32 checksum, no curve validation). That keeps the package at zero dependencies and very fast, but it means a shape-valid string is not guaranteed to be a real, spendable address.

**Standard EVM chains are indistinguishable by address shape.** Ethereum, BSC, Base, Arbitrum, Polygon, and every other standard EVM chain all use the exact same `0x` + 40 hex character format. `detectChains()` will correctly return *all* of them for any well-formed `0x...` address - that's not a bug, it's a fundamental limit of shape-only detection. If you already know which chain you're expecting, use `isValidAddressFor(address, chainId)` instead of trying to read the chain off of `detectChains()`'s first result.

**Base58 chains overlap too.** Solana addresses are an unconstrained 32-44 character base58 string, which is broad enough to also match plenty of valid Tron, Bitcoin, Litecoin and XRPL addresses at the same lengths:

```ts
detectChains("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"); // a real Tron address
// -> [{ chainId: "solana", ... }, { chainId: "tron", ... }]
```

`getAddressFamily()` would only return `"solana"` here (it just returns the first match, and match order isn't a likelihood ranking) - that's exactly why it exists as a quick convenience helper, not the primary API. Prefer `detectChains()` (to see every possibility) or `isValidAddressFor(address, chainId)` (when you already know, or want to confirm, the chain).

## API

### `detectChains(address: string): DetectResult[]`

Returns every chain whose address pattern matches, each as `{ chainId, name, family }`. Returns `[]` if nothing matches or the input is empty/blank.

### `getAddressFamily(address: string): Family | null`

Returns the shape family of the first match (e.g. `"evm"`, `"solana"`, `"bech32"`), or `null` if nothing matches. If you need every possible family/chain match, use `detectChains` instead.

### `isValidAddressFor(address: string, chainId: string): boolean`

Checks the address against one specific chain, by id or alias (e.g. `"ethereum"` or `"eth"`, `"bsc"` or `"bnb"`).

### `listChains(): ChainDefinition[]`

Returns every chain currently known to the library (built-in + anything registered via `registerChain`).

### `registerChain(definition: ChainDefinition): void`

Add a chain this package doesn't ship with yet, or override a built-in one by reusing its `id`.

```ts
import { registerChain } from "which-chain";

registerChain({
  id: "my-chain",
  name: "My Chain",
  family: "evm",
  pattern: {
    full: /^mychain_[a-z0-9]{32}$/,
    partial: /^mychain_[a-z0-9]{0,32}$/,
  },
});
```

## Supported chains

| Family | Chains |
| --- | --- |
| `evm` | Ethereum, BSC, Base, Arbitrum, Avalanche, Polygon, Optimism, Fantom, Gnosis, Cronos, Blast, Linea, Scroll, zkSync, Metis, Boba, Immutable, Worldchain, Mode, Berachain, Hyperliquid, PulseChain, Abstract, Aleph Zero, ApeChain, Beam, Ink, Robinhood, Sonic, Sei |
| `evm-extended-hex` | Aptos, Sui, Starknet |
| `solana` | Solana |
| `tron` | Tron |
| `ton` | TON |
| `xrpl` | XRP Ledger |
| `bech32` | Cosmos Hub, Osmosis, Injective, Celestia |
| `cardano` | Cardano |
| `polkadot` | Polkadot |
| `near` | NEAR |
| `hedera` | Hedera |
| `kaspa` | Kaspa |
| `bitcoin-like` | Bitcoin, Litecoin, Dogecoin |

Missing a chain you need? Open an issue or PR - adding one is usually just a new pattern in `src/families/` plus an entry in `src/chains.ts`, or use `registerChain()` at runtime without forking the package.

## License

MIT
