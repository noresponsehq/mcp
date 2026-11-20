import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { GroupType, GroupType$zodSchema } from "./grouptype.js";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * A workspace group for a building, organization or event. Dates are optional and do not control person retention.
 */
export type Group = {
  id: string;
  environment: AuditSettingsEnvironment;
  name: string;
  type: GroupType;
  attribute: string;
  starts_at: string | null;
  ends_at: string | null;
  venue?: string | undefined;
  host?: string | undefined;
  principals: Array<Principal>;
  topics: Array<string>;
  people: number;
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export const Group$zodSchema: z.ZodType<Group> = z.object({
  attribute: z.string().describe(
    "The attribute its people share. Empty when none was given.",
  ),
  created_at: z.string(),
  created_by: z.string().describe(
    "The member or key label that created the group.",
  ),
  ends_at: z.string().nullable().describe(
    "Optional event end; requires starts_at and must be at or after it. Null when no end is set.",
  ),
  environment: AuditSettingsEnvironment$zodSchema,
  host: z.string().optional().describe("The organisation hosting the group."),
  id: z.string(),
  name: z.string().describe("The group's name."),
  people: z.int().describe("How many people the group holds."),
  principals: z.array(Principal$zodSchema).describe(
    "The people the group protects.",
  ),
  starts_at: z.string().nullable().describe(
    "Optional event start; null for an ongoing group.",
  ),
  topics: z.array(z.string()).describe("Sensitive topics."),
  type: GroupType$zodSchema.describe(
    "What the group's people share: an event, an organisation, a place or another attribute.",
  ),
  updated_at: z.string(),
  venue: z.string().optional().describe("Where the group is held."),
  version: z.int().describe("Goes up by one with every change."),
}).describe(
  "A workspace group for a building, organization or event. Dates are optional and do not control person retention.",
);
