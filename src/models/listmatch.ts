import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The action of the list entry that decided the account.
 */
export const ListMatch = {
  Block: "block",
  Allow: "allow",
} as const;
/**
 * The action of the list entry that decided the account.
 */
export type ListMatch = ClosedEnum<typeof ListMatch>;

export const ListMatch$zodSchema = z.enum([
  "block",
  "allow",
]).describe("The action of the list entry that decided the account.");
