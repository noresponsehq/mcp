import * as z from "zod";
import { Assessment, Assessment$zodSchema } from "./assessment.js";
import {
  AssessmentExpired,
  AssessmentExpired$zodSchema,
} from "./assessmentexpired.js";

/**
 * The assessment, or the minimal notice that it expired.
 */
export type AssessmentUpdatedData =
  | (Assessment & { status: "complete" })
  | (Assessment & { status: "partial" })
  | (Assessment & { status: "pending" })
  | (AssessmentExpired & { status: "expired" });

export const AssessmentUpdatedData$zodSchema: z.ZodType<AssessmentUpdatedData> =
  z.union([
    Assessment$zodSchema.and(
      z.object({
        status: z.literal("complete"),
      }).transform((v) => ({ status: v.status })),
    ),
    Assessment$zodSchema.and(
      z.object({
        status: z.literal("partial"),
      }).transform((v) => ({ status: v.status })),
    ),
    Assessment$zodSchema.and(
      z.object({
        status: z.literal("pending"),
      }).transform((v) => ({ status: v.status })),
    ),
    AssessmentExpired$zodSchema.and(
      z.object({
        status: z.literal("expired"),
      }).transform((v) => ({ status: v.status })),
    ),
  ]).describe("The assessment, or the minimal notice that it expired.");
