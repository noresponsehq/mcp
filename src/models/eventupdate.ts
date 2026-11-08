import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Changes the fields it names; at least one besides expected_version.
 */
export type EventUpdate = {
  name?: string | undefined;
  starts_at?: string | undefined;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
  expected_version?: number | undefined;
};

export const EventUpdate$zodSchema: z.ZodType<EventUpdate> = z.object({
  ends_at: z.string().optional().describe(
    "When the event ends, at or after its start; the start when omitted.",
  ),
  expected_version: z.int().optional().describe(
    "When present, the change applies only if the event is still at this version (409 event_conflict otherwise).",
  ),
  host: z.string().optional().describe("The organisation hosting the event."),
  name: z.string().optional().describe("The event's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the event protects, at most 20.",
  ),
  starts_at: z.string().optional().describe("When the event starts."),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the event is held."),
}).describe(
  "Changes the fields it names; at least one besides expected_version.",
);
