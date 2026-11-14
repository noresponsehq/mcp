import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * A group and its screening context.
 */
export type Group = {
  id: string;
  environment: AuditSettingsEnvironment;
  name: string;
  starts_at: string;
  ends_at: string;
  venue?: string | undefined;
  host?: string | undefined;
  principals: Array<Principal>;
  topics: Array<string>;
  people: number;
  version: number;
  purge_after: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export const Group$zodSchema: z.ZodType<Group> = z.object({
  created_at: z.string(),
  created_by: z.string().describe(
    "The member or key label that created the group.",
  ),
  ends_at: z.string().describe(
    "When the group ends, at or after its start; the start when omitted.",
  ),
  environment: AuditSettingsEnvironment$zodSchema,
  host: z.string().optional().describe("The organisation hosting the group."),
  id: z.string(),
  name: z.string().describe("The group's name."),
  people: z.int().describe("How many people the group holds."),
  principals: z.array(Principal$zodSchema).describe(
    "The people the group protects.",
  ),
  purge_after: z.string().describe(
    "When raw collected items and unmatched candidate profiles are purged: 30 days after the group ends.",
  ),
  starts_at: z.string().describe("When the group starts."),
  topics: z.array(z.string()).describe("Sensitive topics."),
  updated_at: z.string(),
  venue: z.string().optional().describe("Where the group is held."),
  version: z.int().describe("Goes up by one with every change."),
}).describe("A group and its screening context.");
