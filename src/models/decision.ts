import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.
 */
export const Decision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.
 */
export type Decision = ClosedEnum<typeof Decision>;

export const Decision$zodSchema = z.enum([
  "allow",
  "step_up",
  "review",
  "block",
]).describe(
  "The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.",
);
