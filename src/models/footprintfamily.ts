import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).
 */
export const FootprintFamily = {
  AccountPresence: "account_presence",
  AuthProvider: "auth_provider",
  Breach: "breach",
  BreachAbuse: "breach_abuse",
  CodeHosting: "code_hosting",
} as const;
/**
 * The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).
 */
export type FootprintFamily = ClosedEnum<typeof FootprintFamily>;

export const FootprintFamily$zodSchema = z.enum([
  "account_presence",
  "auth_provider",
  "breach",
  "breach_abuse",
  "code_hosting",
]).describe(
  "The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).",
);
