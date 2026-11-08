import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * An event and its screening context.
 */
export type Event = {
  id: string;
  environment: AuditSettingsEnvironment;
  name: string;
  starts_at: string;
  ends_at: string;
  venue?: string | undefined;
  host?: string | undefined;
  principals: Array<Principal>;
  topics: Array<string>;
  attendees: number;
  version: number;
  purge_after: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export const Event$zodSchema: z.ZodType<Event> = z.object({
  attendees: z.int().describe("How many attendees the event holds."),
  created_at: z.string(),
  created_by: z.string().describe(
    "The member or key label that created the event.",
  ),
  ends_at: z.string().describe(
    "When the event ends, at or after its start; the start when omitted.",
  ),
  environment: AuditSettingsEnvironment$zodSchema,
  host: z.string().optional().describe("The organisation hosting the event."),
  id: z.string(),
  name: z.string().describe("The event's name."),
  principals: z.array(Principal$zodSchema).describe(
    "The people the event protects.",
  ),
  purge_after: z.string().describe(
    "When raw collected items and unmatched candidate profiles are purged: 30 days after the event ends.",
  ),
  starts_at: z.string().describe("When the event starts."),
  topics: z.array(z.string()).describe("Sensitive topics."),
  updated_at: z.string(),
  venue: z.string().optional().describe("Where the event is held."),
  version: z.int().describe("Goes up by one with every change."),
}).describe("An event and its screening context.");
