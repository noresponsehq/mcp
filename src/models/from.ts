import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const From = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
  Held: "held",
} as const;
export type From = ClosedEnum<typeof From>;

export const From$zodSchema = z.enum([
  "allow",
  "step_up",
  "review",
  "block",
  "held",
]);
