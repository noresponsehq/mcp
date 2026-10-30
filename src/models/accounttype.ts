import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * personal, or business: an account a company or school manages.
 */
export const AccountType = {
  Personal: "personal",
  Business: "business",
} as const;
/**
 * personal, or business: an account a company or school manages.
 */
export type AccountType = ClosedEnum<typeof AccountType>;

export const AccountType$zodSchema = z.enum([
  "personal",
  "business",
]).describe("personal, or business: an account a company or school manages.");
