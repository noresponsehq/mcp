import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.
 */
export const ErrorCode = {
  NotAnswered: "not_answered",
  NoSource: "no_source",
  WorkerAttemptsExhausted: "worker_attempts_exhausted",
} as const;
/**
 * Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.
 */
export type ErrorCode = ClosedEnum<typeof ErrorCode>;

export const ErrorCode$zodSchema = z.enum([
  "not_answered",
  "no_source",
  "worker_attempts_exhausted",
]).describe(
  "Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.",
);
