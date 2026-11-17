import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The kind of the value: one of the kinds the environment's enrichment setting names.
 */
export const SuggestedSearchKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
} as const;
/**
 * The kind of the value: one of the kinds the environment's enrichment setting names.
 */
export type SuggestedSearchKind = ClosedEnum<typeof SuggestedSearchKind>;

export const SuggestedSearchKind$zodSchema = z.enum([
  "username",
  "email",
  "phone",
]).describe(
  "The kind of the value: one of the kinds the environment's enrichment setting names.",
);
