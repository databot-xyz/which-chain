import type { AddressPattern } from "../types";

/** Raw user-friendly TON address form: 48 URL-safe base64 characters. */
export const TON_PATTERN: AddressPattern = {
  full: /^[A-Za-z0-9_-]{48}$/,
  partial: /^[A-Za-z0-9_-]{8,48}$/,
};
