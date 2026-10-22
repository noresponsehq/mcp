import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The recommended action: allow, step_up or review. Your application applies it.
 */
export const Recommendation = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
} as const;
/**
 * The recommended action: allow, step_up or review. Your application applies it.
 */
export type Recommendation = ClosedEnum<typeof Recommendation>;

export const Recommendation$zodSchema = z.enum([
  "allow",
  "step_up",
  "review",
]).describe(
  "The recommended action: allow, step_up or review. Your application applies it.",
);
