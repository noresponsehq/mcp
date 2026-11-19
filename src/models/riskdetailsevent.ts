import * as z from "zod";
import {
  FootprintFamily,
  FootprintFamily$zodSchema,
} from "./footprintfamily.js";
import {
  RiskDetailsEventIdentifier,
  RiskDetailsEventIdentifier$zodSchema,
} from "./riskdetailseventidentifier.js";
import {
  RiskDetailsEventKind,
  RiskDetailsEventKind$zodSchema,
} from "./riskdetailseventkind.js";

export type RiskDetailsEvent = {
  year: number;
  month?: number | undefined;
  kind: RiskDetailsEventKind;
  site: string;
  category: string;
  family: FootprintFamily;
  identifier: RiskDetailsEventIdentifier;
};

export const RiskDetailsEvent$zodSchema: z.ZodType<RiskDetailsEvent> = z.object(
  {
    category: z.string(),
    family: FootprintFamily$zodSchema.describe(
      "The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).",
    ),
    identifier: RiskDetailsEventIdentifier$zodSchema,
    kind: RiskDetailsEventKind$zodSchema,
    month: z.int().optional(),
    site: z.string(),
    year: z.int(),
  },
);
