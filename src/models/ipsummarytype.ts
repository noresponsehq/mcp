import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The address's network type.
 */
export const IpSummaryType = {
  Residential: "residential",
  Hosting: "hosting",
  Vpn: "vpn",
  Proxy: "proxy",
  Tor: "tor",
  Mobile: "mobile",
  Unknown: "unknown",
} as const;
/**
 * The address's network type.
 */
export type IpSummaryType = ClosedEnum<typeof IpSummaryType>;

export const IpSummaryType$zodSchema = z.enum([
  "residential",
  "hosting",
  "vpn",
  "proxy",
  "tor",
  "mobile",
  "unknown",
]).describe("The address's network type.");
