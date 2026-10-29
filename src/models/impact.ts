import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The selected reason's served impact band. Requires reason.
 */
export const Impact = {
  None: "none",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * The selected reason's served impact band. Requires reason.
 */
export type Impact = ClosedEnum<typeof Impact>;

export const Impact$zodSchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
]).describe("The selected reason's served impact band. Requires reason.");
