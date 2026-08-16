import type { AddressPattern } from "../types";

/** Hedera account/entity IDs, shaped "shard.realm.num", e.g. "0.0.12345". */
export const HEDERA_PATTERN: AddressPattern = {
  full: /^\d+\.\d+\.\d+$/,
  partial: /^\d+(\.\d+){0,2}$/,
};
