import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const RiskDetailsEventKind = {
  Created: "created",
  LastActive: "last_active",
  Breached: "breached",
} as const;
export type RiskDetailsEventKind = ClosedEnum<typeof RiskDetailsEventKind>;

export const RiskDetailsEventKind$zodSchema = z.enum([
  "created",
  "last_active",
  "breached",
]);
