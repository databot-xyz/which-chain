# which-chain

Zero-dependency blockchain address shape detection. Given a raw address string, figure out which chain(s) it could belong to, validate it against a specific chain, and - for chains with a checksum scheme - verify the checksum itself.

```ts
import { detectChains, getAddressFamily, isValidAddressFor, verifyChecksum } from "which-chain";

detectChains("So11111111111111111111111111111111111111112");
// -> [{ chainId: "solana", name: "Solana", family: "solana", checksum: "unknown" }]

isValidAddressFor("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "tron");
// -> true

getAddressFamily("addr1023456789acdefghjklmnpqrs");
// -> "cardano"

verifyChecksum("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ethereum");
// -> "valid" (EIP-55 mixed-case checksum)
```

## Install

```
npm install which-chain
```

## Shape detection, plus optional checksum verification

`which-chain`'s primary job is checking whether a string is **shaped like** a valid address for a chain (correct prefix, character set, length) using regular expressions - no cryptography, no dependencies. On top of that, for chains with a well-known checksum scheme, it can also verify the checksum itself using small pure-JS implementations of SHA-256, Keccak-256, base58check and bech32/bech32m - still zero dependencies, no cryptographic library required.

Every `DetectResult` (and `verifyChecksum(address, chainId)`) carries a `checksum` field: `"valid"`, `"invalid"`, or `"unknown"`. `"unknown"` means "not checked" (either the chain has no checksum scheme this package implements, or this specific address has no checksum data to check - e.g. an all-lowercase EVM address) - it is **not** evidence the address is wrong, so don't treat it as a rejection.

Checksum coverage today: EIP-55 for every EVM chain, base58check for Bitcoin/Litecoin/Dogecoin/Tron/Tezos, and bech32/bech32m for Bitcoin/Litecoin segwit, Cardano, and the Cosmos-family bech32 chains. Everything else (Solana, TON, XRPL, Polkadot, NEAR, Hedera, Kaspa, Stellar, Algorand, Filecoin, Bitcoin Cash, Aptos/Sui/Starknet) has no checksum scheme implemented yet and always reports `"unknown"` - not a curve/checksum validation gap you should assume is safe to ignore, just not yet covered.

**Standard EVM chains are still indistinguishable by address shape** - checksums don't help here, since every EVM chain shares the exact same address format. Ethereum, BSC, Base, Arbitrum, Polygon, and every other standard EVM chain all use the exact same `0x` + 40 hex character format. `detectChains()` will correctly return *all* of them for any well-formed `0x...` address - that's not a bug, it's a fundamental limit of shape-only detection. If you already know which chain you're expecting, use `isValidAddressFor(address, chainId)` instead of trying to read the chain off of `detectChains()`'s first result.

**Base58 chains overlap too, but checksums can now break some of those ties.** Solana addresses are an unconstrained 32-44 character base58 string, broad enough to also match plenty of valid Tron, Bitcoin, Litecoin and XRPL addresses at the same lengths:

```ts
detectChains("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"); // a real Tron address
// -> [
//   { chainId: "solana", ..., checksum: "unknown" },  // Solana has no checksum scheme - can't be ruled out by shape alone
//   { chainId: "tron", ..., checksum: "valid" },       // but only Tron's base58check actually verifies
// ]
```

`getAddressFamily()` would only return `"solana"` here (it just returns the first match, and match order isn't a likelihood ranking) - that's exactly why it exists as a quick convenience helper, not the primary API. Prefer `detectChains()` (to see every possibility, and each one's checksum status) or `isValidAddressFor`/`verifyChecksum` (when you already know, or want to confirm, the chain).

## API

### `detectChains(address: string): DetectResult[]`

Returns every chain whose address pattern matches, each as `{ chainId, name, family, checksum }`, where `checksum` is `"valid" | "invalid" | "unknown"`. Returns `[]` if nothing matches or the input is empty/blank.

### `getAddressFamily(address: string): Family | null`

Returns the shape family of the first match (e.g. `"evm"`, `"solana"`, `"bech32"`), or `null` if nothing matches. If you need every possible family/chain match, use `detectChains` instead.

### `isValidAddressFor(address: string, chainId: string): boolean`

Checks the address's **shape** against one specific chain, by id or alias (e.g. `"ethereum"` or `"eth"`, `"bsc"` or `"bnb"`). Not affected by checksum validity - use `verifyChecksum` for that.

### `verifyChecksum(address: string, chainId: string): "valid" | "invalid" | "unknown"`

Checks the address's checksum against one specific chain (or alias). Returns `"unknown"` for an unrecognized chain id, a shape-invalid address, or a chain/address with no checksum to check.

```ts
verifyChecksum("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ethereum"); // -> "valid"
verifyChecksum("0x5aaeb6053F3E94C9b9A09f33669435E7Ef1BeAed", "ethereum"); // -> "invalid" (wrong casing)
verifyChecksum("0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed", "ethereum"); // -> "unknown" (all-lowercase, no checksum to check)
```

### `listChains(): ChainDefinition[]`

Returns every chain currently known to the library (built-in + anything registered via `registerChain`).

### `registerChain(definition: ChainDefinition): void`

Add a chain this package doesn't ship with yet, or override a built-in one by reusing its `id`. Pass a `verifyChecksum` function too if the chain has a checksum scheme you want `detectChains`/`verifyChecksum` to check.

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

| Family | Chains | Checksum |
| --- | --- | --- |
| `evm` | Ethereum, BSC, Base, Arbitrum, Avalanche, Polygon, Optimism, Fantom, Gnosis, Cronos, Blast, Linea, Scroll, zkSync, Metis, Boba, Immutable, Worldchain, Mode, Berachain, Hyperliquid, PulseChain, Abstract, Aleph Zero, ApeChain, Beam, Ink, Robinhood, Sonic, Sei | EIP-55 |
| `evm-extended-hex` | Aptos, Sui, Starknet | - |
| `solana` | Solana | - |
| `tron` | Tron | base58check |
| `ton` | TON | - |
| `xrpl` | XRP Ledger | - |
| `bech32` | Cosmos Hub, Osmosis, Injective, Celestia | bech32 |
| `cardano` | Cardano | bech32 |
| `polkadot` | Polkadot | - |
| `near` | NEAR | - |
| `hedera` | Hedera | - |
| `kaspa` | Kaspa | - |
| `bitcoin-like` | Bitcoin, Litecoin, Dogecoin | base58check (+ bech32/bech32m for segwit) |
| `stellar` | Stellar | - |
| `algorand` | Algorand | - |
| `filecoin` | Filecoin | - |
| `cashaddr` | Bitcoin Cash | - |
| `tezos` | Tezos | base58check |

Missing a chain you need? Open an issue or PR - adding one is usually just a new pattern in `src/families/` plus an entry in `src/chains.ts`, or use `registerChain()` at runtime without forking the package.

## License

MIT
