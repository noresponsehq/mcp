import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses.
 */
export const SourceId = {
  Github: "github",
  Phone: "phone",
  Breach: "breach",
  Rdap: "rdap",
  Mx: "mx",
  Ipintel: "ipintel",
  Adobe: "adobe",
  Nvidia: "nvidia",
  Wix: "wix",
  Life360: "life360",
  Zapier: "zapier",
  Google: "google",
} as const;
/**
 * A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses.
 */
export type SourceId = ClosedEnum<typeof SourceId>;

export const SourceId$zodSchema = z.enum([
  "github",
  "phone",
  "breach",
  "rdap",
  "mx",
  "ipintel",
  "adobe",
  "nvidia",
  "wix",
  "life360",
  "zapier",
  "google",
]).describe(
  "A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses.",
);
