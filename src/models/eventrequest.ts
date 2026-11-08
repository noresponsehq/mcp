import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Creates an event.
 */
export type EventRequest = {
  name: string;
  starts_at: string;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
};

export const EventRequest$zodSchema: z.ZodType<EventRequest> = z.object({
  ends_at: z.string().optional().describe(
    "When the event ends, at or after its start; the start when omitted.",
  ),
  host: z.string().optional().describe("The organisation hosting the event."),
  name: z.string().describe("The event's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the event protects, at most 20.",
  ),
  starts_at: z.string().describe("When the event starts."),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the event is held."),
}).describe("Creates an event.");
