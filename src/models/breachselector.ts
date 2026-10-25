import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.
 */
export const BreachSelector = {
  Email: "email",
  Username: "username",
  Ip: "ip",
} as const;
/**
 * The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.
 */
export type BreachSelector = ClosedEnum<typeof BreachSelector>;

export const BreachSelector$zodSchema = z.enum([
  "email",
  "username",
  "ip",
]).describe(
  "The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.",
);
