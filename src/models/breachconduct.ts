import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.
 */
export const BreachConduct = {
  Chargeback: "chargeback",
  DeclinedPayment: "declined_payment",
  ForumSanction: "forum_sanction",
} as const;
/**
 * What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.
 */
export type BreachConduct = ClosedEnum<typeof BreachConduct>;

export const BreachConduct$zodSchema = z.enum([
  "chargeback",
  "declined_payment",
  "forum_sanction",
]).describe(
  "What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.",
);
