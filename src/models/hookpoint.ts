import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider event a provider_hook context was sent for; absent for any other transport.
 */
export const HookPoint = {
  PreRegistration: "pre_registration",
  PostRegistration: "post_registration",
  PreLogin: "pre_login",
  PostLogin: "post_login",
  TokenIssuance: "token_issuance",
} as const;
/**
 * The provider event a provider_hook context was sent for; absent for any other transport.
 */
export type HookPoint = ClosedEnum<typeof HookPoint>;

export const HookPoint$zodSchema = z.enum([
  "pre_registration",
  "post_registration",
  "pre_login",
  "post_login",
  "token_issuance",
]).describe(
  "The provider event a provider_hook context was sent for; absent for any other transport.",
);
