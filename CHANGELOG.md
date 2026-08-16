# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-08-16

### Added

- Optional checksum verification: `verifyChecksum(address, chainId)` and a
  `checksum` field (`"valid" | "invalid" | "unknown"`) on every `detectChains`
  result, backed by zero-dependency pure-JS SHA-256, Keccak-256, base58, and
  bech32/bech32m implementations.
- EIP-55 checksum support for every EVM chain.
- base58check checksum support for Bitcoin, Litecoin, Dogecoin, Tron, and
  Tezos.
- bech32/bech32m checksum support for Bitcoin/Litecoin native segwit,
  Cardano, and the Cosmos-family bech32 chains.
- Five new chains: Bitcoin Cash (`cashaddr`), Stellar, Algorand, Filecoin,
  and Tezos.
- `ChainDefinition.verifyChecksum` so `registerChain` callers can wire up
  checksum verification for their own custom chains.

## [0.1.0] - 2026-08-16

### Added

- Initial release: zero-dependency address shape detection across 49 chains
  (`detectChains`, `getAddressFamily`, `isValidAddressFor`, `listChains`,
  `registerChain`).
