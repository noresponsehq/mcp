import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";

export type WorkspacePerson = {
  external_id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle> | undefined;
  id: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
};

export const WorkspacePerson$zodSchema: z.ZodType<WorkspacePerson> = z.object({
  city: z.string().optional().describe("Where the person lives."),
  company: z.string().optional().describe("Where the person works."),
  created_at: z.string(),
  email: z.string().optional().describe("The person's email."),
  expires_at: z.string().describe(
    "The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.",
  ),
  external_id: z.string().optional().describe(
    "Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.",
  ),
  handles: z.array(Handle$zodSchema).optional().describe(
    "Accounts the person is known to hold, at most 20.",
  ),
  id: z.string(),
  name: z.string().optional(),
  phone: z.string().optional().describe("The person's phone in E.164 form."),
  updated_at: z.string(),
});
