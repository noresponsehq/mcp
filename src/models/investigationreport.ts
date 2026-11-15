import * as z from "zod";
import { Investigation, Investigation$zodSchema } from "./investigation.js";
import { PersonReview, PersonReview$zodSchema } from "./personreview.js";
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
import {
  WorkspacePerson,
  WorkspacePerson$zodSchema,
} from "./workspaceperson.js";

/**
 * Read an investigation and its evidence.
 */
export type InvestigationReport = {
  profiles: Array<ScreeningProfile>;
  findings: Array<ScreeningFinding>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  reviews: Array<PersonReview>;
  lookup?: ScreeningLookup | undefined;
  evidence_restricted?: boolean | undefined;
  person: WorkspacePerson;
  investigation: Investigation;
};

export const InvestigationReport$zodSchema: z.ZodType<InvestigationReport> = z
  .object({
    evidence_restricted: z.boolean().optional().describe(
      "True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.",
    ),
    findings: z.array(ScreeningFinding$zodSchema).describe(
      "What this result flagged, most severe first, each citing its evidence.",
    ),
    investigation: Investigation$zodSchema,
    lookup: ScreeningLookup$zodSchema.optional().describe(
      "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.",
    ),
    media: z.array(ScreeningMedia$zodSchema).describe(
      "All images and videos retained for this result, including media that no finding cites.",
    ),
    person: WorkspacePerson$zodSchema,
    posts: z.array(ScreeningPost$zodSchema).describe(
      "All posts retained for this result, including posts that no finding cites.",
    ),
    profiles: z.array(ScreeningProfile$zodSchema).describe(
      "The accounts this result matched, with how each was matched.",
    ),
    reviews: z.array(PersonReview$zodSchema).describe(
      "Every recorded decision, oldest first.",
    ),
  }).describe("Read an investigation and its evidence.");
