import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
 */
export const Decision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
 */
export type Decision = ClosedEnum<typeof Decision>;

export const Decision$zodSchema = z.enum([
  "allow",
  "step_up",
  "review",
  "block",
]).describe(
  "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
);
