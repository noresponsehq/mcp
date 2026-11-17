import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";

export type WorkspacePersonRequest = {
  external_id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  username?: string | undefined;
  handles?: Array<Handle> | undefined;
  person_id?: string | undefined;
};

export const WorkspacePersonRequest$zodSchema: z.ZodType<
  WorkspacePersonRequest
> = z.object({
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
  username: z.string().optional().describe(
    "A username the person uses, with no platform. A search looks it up on every platform that finds accounts by username.",
  ),
});
