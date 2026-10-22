import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * An evidence lane: accounts (account presence for email and username), phone, breach and ip.
 */
export const Lane = {
  Accounts: "accounts",
  Phone: "phone",
  Breach: "breach",
  Ip: "ip",
} as const;
/**
 * An evidence lane: accounts (account presence for email and username), phone, breach and ip.
 */
export type Lane = ClosedEnum<typeof Lane>;

export const Lane$zodSchema = z.enum([
  "accounts",
  "phone",
  "breach",
  "ip",
]).describe(
  "An evidence lane: accounts (account presence for email and username), phone, breach and ip.",
);
