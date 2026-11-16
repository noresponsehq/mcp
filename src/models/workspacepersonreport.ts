import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";
import { Investigation, Investigation$zodSchema } from "./investigation.js";
import {
  ScreeningFinding,
  ScreeningFinding$zodSchema,
} from "./screeningfinding.js";
import {
  ScreeningLookup,
  ScreeningLookup$zodSchema,
} from "./screeninglookup.js";
import { ScreeningMedia, ScreeningMedia$zodSchema } from "./screeningmedia.js";
import { ScreeningPost, ScreeningPost$zodSchema } from "./screeningpost.js";
import {
  ScreeningProfile,
  ScreeningProfile$zodSchema,
} from "./screeningprofile.js";
import { WrittenProfile, WrittenProfile$zodSchema } from "./writtenprofile.js";

/**
 * Read a workspace person.
 */
export type WorkspacePersonReport = {
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
  profiles: Array<ScreeningProfile>;
  findings: Array<ScreeningFinding>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  lookup?: ScreeningLookup | undefined;
  evidence_restricted?: boolean | undefined;
  evidence_investigation: Investigation | null;
  written_profile: WrittenProfile | null;
};

export const WorkspacePersonReport$zodSchema: z.ZodType<WorkspacePersonReport> =
  z.object({
    city: z.string().optional().describe("Where the person lives."),
    company: z.string().optional().describe("Where the person works."),
    created_at: z.string(),
    email: z.string().optional().describe("The person's email."),
    evidence_investigation: Investigation$zodSchema.nullable().describe(
      "The most recent retained completed or partial investigation, or a migrated result whose original per-person status is unknown. The evidence below belongs to this investigation. Read investigation history for earlier results and pending jobs.",
    ),
    evidence_restricted: z.boolean().optional().describe(
      "True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.",
    ),
    expires_at: z.string().describe(
      "The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.",
    ),
    external_id: z.string().optional().describe(
      "Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.",
    ),
    findings: z.array(ScreeningFinding$zodSchema).describe(
      "What this result flagged, most severe first, each citing its evidence.",
    ),
    handles: z.array(Handle$zodSchema).optional().describe(
      "Accounts the person is known to hold, at most 20.",
    ),
    id: z.string(),
    lookup: ScreeningLookup$zodSchema.optional().describe(
      "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.",
    ),
    media: z.array(ScreeningMedia$zodSchema).describe(
      "All images and videos retained for this result, including media that no finding cites.",
    ),
    name: z.string().optional(),
    phone: z.string().optional().describe("The person's phone in E.164 form."),
    posts: z.array(ScreeningPost$zodSchema).describe(
      "All posts retained for this result, including posts that no finding cites.",
    ),
    profiles: z.array(ScreeningProfile$zodSchema).describe(
      "The accounts this result matched, with how each was matched.",
    ),
    updated_at: z.string(),
    written_profile: WrittenProfile$zodSchema.nullable().describe(
      "An investigator's profile of this person, written from the evidence of a settled investigation. Null until an investigation completes or partially completes, and null when evidence.read is denied.",
    ),
  }).describe("Read a workspace person.");
