import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields and findings are medium, new posts are low.
 */
export const Significance = {
  High: "high",
  Medium: "medium",
  Low: "low",
} as const;
/**
 * One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields and findings are medium, new posts are low.
 */
export type Significance = ClosedEnum<typeof Significance>;

export const Significance$zodSchema = z.enum([
  "high",
  "medium",
  "low",
]).describe(
  "One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields and findings are medium, new posts are low.",
);
