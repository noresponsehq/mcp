import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.
 */
export const WrittenProfileStatus = {
  Queued: "queued",
  Written: "written",
  Failed: "failed",
} as const;
/**
 * queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.
 */
export type WrittenProfileStatus = ClosedEnum<typeof WrittenProfileStatus>;

export const WrittenProfileStatus$zodSchema = z.enum([
  "queued",
  "written",
  "failed",
]).describe(
  "queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.",
);
