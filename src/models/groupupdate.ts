import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Changes the fields it names; at least one besides expected_version.
 */
export type GroupUpdate = {
  name?: string | undefined;
  starts_at?: string | undefined;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
  expected_version?: number | undefined;
};

export const GroupUpdate$zodSchema: z.ZodType<GroupUpdate> = z.object({
  ends_at: z.string().optional().describe(
    "When the group ends, at or after its start; the start when omitted.",
  ),
  expected_version: z.int().optional().describe(
    "When present, the change applies only if the group is still at this version (409 group_conflict otherwise).",
  ),
  host: z.string().optional().describe("The organisation hosting the group."),
  name: z.string().optional().describe("The group's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the group protects, at most 20.",
  ),
  starts_at: z.string().optional().describe("When the group starts."),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the group is held."),
}).describe(
  "Changes the fields it names; at least one besides expected_version.",
);
