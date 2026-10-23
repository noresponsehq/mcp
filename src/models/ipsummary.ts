import * as z from "zod";
import { IpSummaryType, IpSummaryType$zodSchema } from "./ipsummarytype.js";

/**
 * Facts about the submitted IP from the offline database and this workspace's own recent assessments. Every member is optional; absent makes no claim.
 */
export type IpSummary = {
  country?: string | undefined;
  type?: IpSummaryType | undefined;
  seen_in_workspace?: number | undefined;
};

export const IpSummary$zodSchema: z.ZodType<IpSummary> = z.object({
  country: z.string().optional().describe(
    "ISO 3166-1 alpha-2 country of the address.",
  ),
  seen_in_workspace: z.int().optional().describe(
    "Assessments in this workspace with the same IP in the last 24 hours, this one included. A count only.",
  ),
  type: IpSummaryType$zodSchema.optional().describe(
    "The address's network type.",
  ),
}).describe(
  "Facts about the submitted IP from the offline database and this workspace's own recent assessments. Every member is optional; absent makes no claim.",
);
