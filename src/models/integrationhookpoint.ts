import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * pre_registration runs before the user exists; post_login runs after a successful sign-in.
 */
export const IntegrationHookPoint = {
  PreRegistration: "pre_registration",
  PostLogin: "post_login",
} as const;
/**
 * pre_registration runs before the user exists; post_login runs after a successful sign-in.
 */
export type IntegrationHookPoint = ClosedEnum<typeof IntegrationHookPoint>;

export const IntegrationHookPoint$zodSchema = z.enum([
  "pre_registration",
  "post_login",
]).describe(
  "pre_registration runs before the user exists; post_login runs after a successful sign-in.",
);
