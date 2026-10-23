import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.
 */
export const Failure = {
  InvalidUrl: "invalid_url",
  ResolveFailed: "resolve_failed",
  AddressRefused: "address_refused",
  Timeout: "timeout",
  ConnectionFailed: "connection_failed",
  Redirect: "redirect",
  Non2xx: "non_2xx",
} as const;
/**
 * Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.
 */
export type Failure = ClosedEnum<typeof Failure>;

export const Failure$zodSchema = z.enum([
  "invalid_url",
  "resolve_failed",
  "address_refused",
  "timeout",
  "connection_failed",
  "redirect",
  "non_2xx",
]).describe(
  "Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.",
);
