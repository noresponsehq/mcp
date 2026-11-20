import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Updates a group. Dates describe an optional event and do not control person retention.
 */
export type GroupUpdate = {
  name?: string | undefined;
  attribute?: string | undefined;
  starts_at?: string | null | undefined;
  ends_at?: string | null | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
  expected_version?: number | undefined;
};

export const GroupUpdate$zodSchema: z.ZodType<GroupUpdate> = z.object({
  attribute: z.string().optional().describe(
    "The attribute its people share. Omit to keep the current value.",
  ),
  ends_at: z.string().nullable().optional().describe(
    "Optional event end; requires starts_at and must be at or after it. Null when no end is set. Omit to keep the current value; send null to clear it.",
  ),
  expected_version: z.int().optional().describe(
    "When present, the change applies only if the group is still at this version (409 group_conflict otherwise).",
  ),
  host: z.string().optional().describe("The organisation hosting the group."),
  name: z.string().optional().describe("The group's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the group protects, at most 20.",
  ),
  starts_at: z.string().nullable().optional().describe(
    "Optional event start; null for an ongoing group. Omit to keep the current value; send null to clear it.",
  ),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the group is held."),
}).describe(
  "Updates a group. Dates describe an optional event and do not control person retention.",
);
