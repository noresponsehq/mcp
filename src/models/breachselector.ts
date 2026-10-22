import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.
 */
export const BreachSelector = {
  Email: "email",
  Username: "username",
  Ip: "ip",
} as const;
/**
 * The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.
 */
export type BreachSelector = ClosedEnum<typeof BreachSelector>;

export const BreachSelector$zodSchema = z.enum([
  "email",
  "username",
  "ip",
]).describe(
  "The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.",
);
