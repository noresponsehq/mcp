import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.
 */
export const EnforcementStatus = {
  Applied: "applied",
  Failed: "failed",
} as const;
/**
 * applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.
 */
export type EnforcementStatus = ClosedEnum<typeof EnforcementStatus>;

export const EnforcementStatus$zodSchema = z.enum([
  "applied",
  "failed",
]).describe(
  "applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.",
);
