import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ScreeningDepth = {
  Standard: "standard",
} as const;
export type ScreeningDepth = ClosedEnum<typeof ScreeningDepth>;

export const ScreeningDepth$zodSchema = z.enum([
  "standard",
]);
