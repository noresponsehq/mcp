import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const CustomerExportRequestFilterOutcome = {
  Succeeded: "succeeded",
  Denied: "denied",
} as const;
export type CustomerExportRequestFilterOutcome = ClosedEnum<
  typeof CustomerExportRequestFilterOutcome
>;

export const CustomerExportRequestFilterOutcome$zodSchema = z.enum([
  "succeeded",
  "denied",
]);
