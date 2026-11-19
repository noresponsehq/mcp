import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";
import { Investigation, Investigation$zodSchema } from "./investigation.js";
import { PersonChange, PersonChange$zodSchema } from "./personchange.js";
import { PersonGroup, PersonGroup$zodSchema } from "./persongroup.js";
import { PersonSchedule, PersonSchedule$zodSchema } from "./personschedule.js";
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
import { Search, Search$zodSchema } from "./search.js";
import {
  SuggestedSearch,
  SuggestedSearch$zodSchema,
} from "./suggestedsearch.js";

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
  username?: string | undefined;
  handles?: Array<Handle> | undefined;
  id: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  groups: Array<PersonGroup>;
  profiles: Array<ScreeningProfile>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  lookup?: ScreeningLookup | undefined;
  searches?: Array<Search> | undefined;
  suggested_searches: Array<SuggestedSearch>;
  evidence_restricted?: boolean | undefined;
  evidence_investigation: Investigation | null;
  changes: Array<PersonChange>;
  schedule: PersonSchedule;
};

export const WorkspacePersonReport$zodSchema: z.ZodType<WorkspacePersonReport> =
  z.object({
    changes: z.array(PersonChange$zodSchema).describe(
      "What changed between each settled investigation of this person and the one before it, unreviewed first, then most significant, then newest. The first investigation records no changes. When evidence.read is denied, before and after are withheld.",
    ),
    city: z.string().optional().describe("Where the person lives."),
    company: z.string().optional().describe("Where the person works."),
    created_at: z.string(),
    email: z.string().optional().describe("The person's email."),
    evidence_investigation: Investigation$zodSchema.nullable().describe(
      "The most recent retained completed or partial investigation, or a migrated result whose original per-person status is unknown. The evidence below belongs to this investigation. Read investigation history for earlier results and pending jobs.",
    ),
    evidence_restricted: z.boolean().optional().describe(
      "True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, posts, media, discovered values and free-text decision notes are withheld.",
    ),
    expires_at: z.string().describe(
      "The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.",
    ),
    external_id: z.string().optional().describe(
      "Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.",
    ),
    groups: z.array(PersonGroup$zodSchema).describe(
      "Every group this person belongs to in this environment, most recently added first, with their role in each. A person can belong to any number of groups; removing them from a group or deleting the group removes it here.",
    ),
    handles: z.array(Handle$zodSchema).optional().describe(
      "Accounts the person is known to hold, at most 20.",
    ),
    id: z.string(),
    lookup: ScreeningLookup$zodSchema.optional().describe(
      "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state.",
    ),
    media: z.array(ScreeningMedia$zodSchema).describe(
      "All images and videos retained for this result.",
    ),
    name: z.string().optional(),
    phone: z.string().optional().describe("The person's phone in E.164 form."),
    posts: z.array(ScreeningPost$zodSchema).describe(
      "All posts retained for this result.",
    ),
    profiles: z.array(ScreeningProfile$zodSchema).describe(
      "The accounts this result matched, with how each was matched.",
    ),
    schedule: PersonSchedule$zodSchema.describe(
      "The person's rerun schedule. Each due run starts a full investigation of the person, as POST /v1/investigations with no platforms does, and its changes are stored as changes. The schedule lives in the database and the worker runs it, so it survives restarts and releases; each due run starts exactly one investigation.",
    ),
    searches: z.array(Search$zodSchema).optional().describe(
      "Every search on this person's values, newest first, whether a person started it or enrichment did: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.",
    ),
    suggested_searches: z.array(SuggestedSearch$zodSchema).describe(
      "The searches enrichment would start on this person, likeliest record first, under the environment's enrichment setting for a person's own investigation. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied.",
    ),
    updated_at: z.string(),
    username: z.string().optional().describe(
      "A username the person uses, with no platform. A search looks it up on every platform that finds accounts by username.",
    ),
  }).describe("Read a workspace person.");
