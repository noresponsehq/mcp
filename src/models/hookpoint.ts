import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.
 */
export const HookPoint = {
  PreRegistration: "pre_registration",
  PostRegistration: "post_registration",
  PreLogin: "pre_login",
  PostLogin: "post_login",
  TokenIssuance: "token_issuance",
} as const;
/**
 * The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.
 */
export type HookPoint = ClosedEnum<typeof HookPoint>;

export const HookPoint$zodSchema = z.enum([
  "pre_registration",
  "post_registration",
  "pre_login",
  "post_login",
  "token_issuance",
]).describe(
  "The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.",
);
