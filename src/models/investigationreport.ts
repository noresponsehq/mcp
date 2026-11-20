import * as z from "zod";
import { Investigation, Investigation$zodSchema } from "./investigation.js";
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
import {
  WorkspacePerson,
  WorkspacePerson$zodSchema,
} from "./workspaceperson.js";

/**
 * Read an investigation and its evidence.
 */
export type InvestigationReport = {
  profiles: Array<ScreeningProfile>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  lookup?: ScreeningLookup | undefined;
  evidence_restricted?: boolean | undefined;
  person: WorkspacePerson;
  investigation: Investigation;
};

export const InvestigationReport$zodSchema: z.ZodType<InvestigationReport> = z
  .object({
    evidence_restricted: z.boolean().optional().describe(
      "True when evidence.read is explicitly denied. Submitted details, coverage and job status remain available. Collected records, profiles, posts, media and discovered values are withheld.",
    ),
    investigation: Investigation$zodSchema,
    lookup: ScreeningLookup$zodSchema.optional().describe(
      "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state.",
    ),
    media: z.array(ScreeningMedia$zodSchema).describe(
      "All images and videos retained for this result.",
    ),
    person: WorkspacePerson$zodSchema,
    posts: z.array(ScreeningPost$zodSchema).describe(
      "All posts retained for this result.",
    ),
    profiles: z.array(ScreeningProfile$zodSchema).describe(
      "The accounts this result matched, with how each was matched.",
    ),
  }).describe("Read an investigation and its evidence.");
