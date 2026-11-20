import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * assessments only.
 */
export const Flow = {
  AccountCreation: "account_creation",
  Login: "login",
  Purchase: "purchase",
} as const;
/**
 * assessments only.
 */
export type Flow = ClosedEnum<typeof Flow>;

export const Flow$zodSchema = z.enum([
  "account_creation",
  "login",
  "purchase",
]).describe("assessments only.");
