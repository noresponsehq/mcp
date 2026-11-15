import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";
import { PersonRole, PersonRole$zodSchema } from "./personrole.js";

export type PersonIdentity = {
  external_id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle> | undefined;
  person_id?: string | undefined;
  role?: PersonRole | undefined;
};

export const PersonIdentity$zodSchema: z.ZodType<PersonIdentity> = z.object({
  city: z.string().optional().describe("Where the person lives."),
  company: z.string().optional().describe("Where the person works."),
  email: z.string().optional().describe("The person's email."),
  external_id: z.string().optional().describe(
    "Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.",
  ),
  handles: z.array(Handle$zodSchema).optional(),
  name: z.string().optional().describe("The person's full name."),
  person_id: z.string().optional(),
  phone: z.string().optional().describe("The person's phone in E.164 form."),
  role: PersonRole$zodSchema.optional().describe(
    "The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.",
  ),
});
