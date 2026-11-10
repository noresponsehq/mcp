import * as z from "zod";
import { AttendeeRole, AttendeeRole$zodSchema } from "./attendeerole.js";
import { Handle, Handle$zodSchema } from "./handle.js";

/**
 * What you know about an attendee. Stored encrypted under the workspace's key.
 */
export type AttendeeIdentity = {
  external_id?: string | undefined;
  name: string;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle> | undefined;
  role?: AttendeeRole | undefined;
};

export const AttendeeIdentity$zodSchema: z.ZodType<AttendeeIdentity> = z.object(
  {
    city: z.string().optional().describe("Where the attendee lives."),
    company: z.string().optional().describe("Where the attendee works."),
    email: z.string().optional().describe("The attendee's email."),
    external_id: z.string().optional().describe(
      "Your own id for the attendee, unique within the event. A later row with the same external id updates this attendee.",
    ),
    handles: z.array(Handle$zodSchema).optional().describe(
      "Accounts the attendee is known to hold, at most 20.",
    ),
    name: z.string().describe("The attendee's full name."),
    phone: z.string().optional().describe(
      "The attendee's phone in E.164 form.",
    ),
    role: AttendeeRole$zodSchema.optional().describe(
      "The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.",
    ),
  },
).describe(
  "What you know about an attendee. Stored encrypted under the workspace's key.",
);
