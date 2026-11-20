import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The response mode recorded for the endpoint: standard (the default) or detailed, which needs an API key with the detailed scope as well. No event the API sends today differs by mode.
 */
export const ResponseMode = {
  Standard: "standard",
  Detailed: "detailed",
} as const;
/**
 * The response mode recorded for the endpoint: standard (the default) or detailed, which needs an API key with the detailed scope as well. No event the API sends today differs by mode.
 */
export type ResponseMode = ClosedEnum<typeof ResponseMode>;

export const ResponseMode$zodSchema = z.enum([
  "standard",
  "detailed",
]).describe(
  "The response mode recorded for the endpoint: standard (the default) or detailed, which needs an API key with the detailed scope as well. No event the API sends today differs by mode.",
);
