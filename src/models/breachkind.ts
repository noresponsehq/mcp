import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.
 */
export const BreachKind = {
  SiteBreach: "site_breach",
  CredentialList: "credential_list",
  StealerLog: "stealer_log",
  Scrape: "scrape",
  HackingForum: "hacking_forum",
  AbuseService: "abuse_service",
  DarkwebSite: "darkweb_site",
} as const;
/**
 * Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.
 */
export type BreachKind = ClosedEnum<typeof BreachKind>;

export const BreachKind$zodSchema = z.enum([
  "site_breach",
  "credential_list",
  "stealer_log",
  "scrape",
  "hacking_forum",
  "abuse_service",
  "darkweb_site",
]).describe(
  "Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.",
);
