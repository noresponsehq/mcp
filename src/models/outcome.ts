import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Outcome = {
  Succeeded: "succeeded",
  Denied: "denied",
} as const;
export type Outcome = ClosedEnum<typeof Outcome>;

export const Outcome$zodSchema = z.enum([
  "succeeded",
  "denied",
]);
