import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * public profiles were read; a private or locked one exists but could not be read.
 */
export const Access = {
  Public: "public",
  Private: "private",
  Locked: "locked",
} as const;
/**
 * public profiles were read; a private or locked one exists but could not be read.
 */
export type Access = ClosedEnum<typeof Access>;

export const Access$zodSchema = z.enum([
  "public",
  "private",
  "locked",
]).describe(
  "public profiles were read; a private or locked one exists but could not be read.",
);
