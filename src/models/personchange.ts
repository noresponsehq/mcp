import * as z from "zod";
import {
  PersonChangeKind,
  PersonChangeKind$zodSchema,
} from "./personchangekind.js";
import { Significance, Significance$zodSchema } from "./significance.js";

export type PersonChange = {
  id: string;
  kind: PersonChangeKind;
  significance: Significance;
  source: string;
  field?: string | undefined;
  before?: string | undefined;
  after?: string | undefined;
  count?: number | undefined;
  investigation_id: string;
  previous_investigation_id: string;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by?: string | undefined;
};

export const PersonChange$zodSchema: z.ZodType<PersonChange> = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  count: z.int().optional(),
  created_at: z.string(),
  field: z.string().optional(),
  id: z.string(),
  investigation_id: z.string().describe(
    "The investigation that found the change.",
  ),
  kind: PersonChangeKind$zodSchema.describe(
    "account_added and account_removed: an account or profile appeared or disappeared. breach_added and breach_removed: a breach record appeared or disappeared. identifier_added and identifier_removed: an email, phone, username, name or account id on an account the person already held. field_changed: another field on such an account. finding_added: a new finding. posts_added: new posts, counted in count.",
  ),
  previous_investigation_id: z.string().describe(
    "The earlier investigation it was compared with.",
  ),
  reviewed_at: z.string().nullable(),
  reviewed_by: z.string().optional(),
  significance: Significance$zodSchema.describe(
    "One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields and findings are medium, new posts are low.",
  ),
  source: z.string().describe(
    "The connector, site or platform the change came from.",
  ),
});
