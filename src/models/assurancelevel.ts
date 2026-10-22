import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Provider or OIDC assurance level, when the customer has mapped one.
 */
export const AssuranceLevel = {
  Unknown: "unknown",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * Provider or OIDC assurance level, when the customer has mapped one.
 */
export type AssuranceLevel = ClosedEnum<typeof AssuranceLevel>;

export const AssuranceLevel$zodSchema = z.enum([
  "unknown",
  "low",
  "medium",
  "high",
]).describe(
  "Provider or OIDC assurance level, when the customer has mapped one.",
);
