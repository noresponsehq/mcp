import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
 */
export const ListEntryKind = {
  Email: "email",
  EmailDomain: "email_domain",
} as const;
/**
 * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
 */
export type ListEntryKind = ClosedEnum<typeof ListEntryKind>;

export const ListEntryKind$zodSchema = z.enum([
  "email",
  "email_domain",
]).describe(
  "email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.",
);
