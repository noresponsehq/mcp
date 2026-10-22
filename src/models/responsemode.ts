import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
 */
export const ResponseMode = {
  Standard: "standard",
  Detailed: "detailed",
} as const;
/**
 * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
 */
export type ResponseMode = ClosedEnum<typeof ResponseMode>;

export const ResponseMode$zodSchema = z.enum([
  "standard",
  "detailed",
]).describe(
  "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
);
