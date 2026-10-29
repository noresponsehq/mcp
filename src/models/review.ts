import * as z from "zod";
import { Priority, Priority$zodSchema } from "./priority.js";
import { Resolution, Resolution$zodSchema } from "./resolution.js";
import { ReviewStatus, ReviewStatus$zodSchema } from "./reviewstatus.js";

export type Review = {
  id: string;
  account_id: string;
  status: ReviewStatus;
  priority: Priority;
  assignee?: string | undefined;
  version: number;
  opened_risk_version: number;
  current_risk_version: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  resolution?: Resolution | undefined;
  assignee_principal_id?: string | undefined;
};

export const Review$zodSchema: z.ZodType<Review> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  assignee: z.string().optional(),
  assignee_principal_id: z.string().optional().describe(
    "Immutable workspace member ID. assignee is the historical display identity captured at assignment.",
  ),
  created_at: z.string(),
  created_by: z.string(),
  current_risk_version: z.int(),
  expires_at: z.string(),
  id: z.string(),
  opened_risk_version: z.int(),
  priority: Priority$zodSchema,
  resolution: Resolution$zodSchema.optional(),
  status: ReviewStatus$zodSchema,
  updated_at: z.string(),
  updated_by: z.string(),
  version: z.int(),
});
