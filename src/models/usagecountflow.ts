import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * assessments only.
 */
export const UsageCountFlow = {
  AccountCreation: "account_creation",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * assessments only.
 */
export type UsageCountFlow = ClosedEnum<typeof UsageCountFlow>;

export const UsageCountFlow$zodSchema = z.enum([
  "account_creation",
  "login",
  "purchase",
]).describe("assessments only.");
