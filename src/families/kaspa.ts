import type { AddressPattern } from "../types";

export const KASPA_PATTERN: AddressPattern = {
  full: /^kaspa:[a-z0-9]{20,80}$/i,
  partial: /^kaspa:[a-z0-9]{4,80}$/i,
};
