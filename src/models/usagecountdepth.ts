import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * assessments only.
 */
export const UsageCountDepth = {
  Quick: "quick",
  Full: "full",
} as const;
/**
 * assessments only.
 */
export type UsageCountDepth = ClosedEnum<typeof UsageCountDepth>;

export const UsageCountDepth$zodSchema = z.enum([
  "quick",
  "full",
]).describe("assessments only.");
