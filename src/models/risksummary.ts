import * as z from "zod";
import { Consistency, Consistency$zodSchema } from "./consistency.js";
import { IpSummary, IpSummary$zodSchema } from "./ipsummary.js";
import {
  RiskSummaryEmail,
  RiskSummaryEmail$zodSchema,
} from "./risksummaryemail.js";
import {
  RiskSummaryPhone,
  RiskSummaryPhone$zodSchema,
} from "./risksummaryphone.js";
import {
  RiskSummaryUsername,
  RiskSummaryUsername$zodSchema,
} from "./risksummaryusername.js";

/**
 * A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.
 */
export type RiskSummary = {
  phone?: RiskSummaryPhone | undefined;
  email?: RiskSummaryEmail | undefined;
  username?: RiskSummaryUsername | undefined;
  ip?: IpSummary | undefined;
  consistency?: Consistency | undefined;
};

export const RiskSummary$zodSchema: z.ZodType<RiskSummary> = z.object({
  consistency: Consistency$zodSchema.optional().describe(
    "Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.",
  ),
  email: RiskSummaryEmail$zodSchema.optional(),
  ip: IpSummary$zodSchema.optional().describe(
    "Facts about the submitted IP from the offline database and this tenant's own recent assessments. Every member is optional; absent makes no claim.",
  ),
  phone: RiskSummaryPhone$zodSchema.optional(),
  username: RiskSummaryUsername$zodSchema.optional(),
}).describe(
  "A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.",
);
