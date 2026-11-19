import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What the implementation did. analyser appears only on spend recorded before the engine stopped analysing posts.
 */
export const ScreeningSpendLineRole = {
  Resolver: "resolver",
  Collector: "collector",
  Analyser: "analyser",
} as const;
/**
 * What the implementation did. analyser appears only on spend recorded before the engine stopped analysing posts.
 */
export type ScreeningSpendLineRole = ClosedEnum<typeof ScreeningSpendLineRole>;

export const ScreeningSpendLineRole$zodSchema = z.enum([
  "resolver",
  "collector",
  "analyser",
]).describe(
  "What the implementation did. analyser appears only on spend recorded before the engine stopped analysing posts.",
);
