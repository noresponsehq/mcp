import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ScreeningSpendLineRole = {
  Resolver: "resolver",
  Collector: "collector",
  Analyser: "analyser",
} as const;
export type ScreeningSpendLineRole = ClosedEnum<typeof ScreeningSpendLineRole>;

export const ScreeningSpendLineRole$zodSchema = z.enum([
  "resolver",
  "collector",
  "analyser",
]);
