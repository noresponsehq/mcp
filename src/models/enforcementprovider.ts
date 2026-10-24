import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The identity provider the action ran in; custom for the workspace's own user store.
 */
export const EnforcementProvider = {
  Clerk: "clerk",
  Workos: "workos",
  Auth0: "auth0",
  Custom: "custom",
} as const;
/**
 * The identity provider the action ran in; custom for the workspace's own user store.
 */
export type EnforcementProvider = ClosedEnum<typeof EnforcementProvider>;

export const EnforcementProvider$zodSchema = z.enum([
  "clerk",
  "workos",
  "auth0",
  "custom",
]).describe(
  "The identity provider the action ran in; custom for the workspace's own user store.",
);
