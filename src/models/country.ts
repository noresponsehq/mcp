import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * IP country, phone country, breach countries and policy_context.region together. When the breach records give a country, the timezone and locale countries count too. The IP country of a proxy or hosting network does not count.
 */
export const Country = {
  Consistent: "consistent",
  Mismatch: "mismatch",
  Unknown: "unknown",
} as const;
/**
 * IP country, phone country, breach countries and policy_context.region together. When the breach records give a country, the timezone and locale countries count too. The IP country of a proxy or hosting network does not count.
 */
export type Country = ClosedEnum<typeof Country>;

export const Country$zodSchema = z.enum([
  "consistent",
  "mismatch",
  "unknown",
]).describe(
  "IP country, phone country, breach countries and policy_context.region together. When the breach records give a country, the timezone and locale countries count too. The IP country of a proxy or hosting network does not count.",
);
