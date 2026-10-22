import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Where the customer derived this context. Backend is the trusted integration path; browser values are treated as weak hints.
 */
export const Transport = {
  Backend: "backend",
  Browser: "browser",
} as const;
/**
 * Where the customer derived this context. Backend is the trusted integration path; browser values are treated as weak hints.
 */
export type Transport = ClosedEnum<typeof Transport>;

export const Transport$zodSchema = z.enum([
  "backend",
  "browser",
]).describe(
  "Where the customer derived this context. Backend is the trusted integration path; browser values are treated as weak hints.",
);
