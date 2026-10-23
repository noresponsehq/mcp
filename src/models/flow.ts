import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
 */
export const Flow = {
  AccountCreation: "account_creation",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
 */
export type Flow = ClosedEnum<typeof Flow>;

export const Flow$zodSchema = z.enum([
  "account_creation",
  "login",
  "purchase",
]).describe(
  "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
);
