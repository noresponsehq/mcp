import * as z from "zod";
import { OtherGroups, OtherGroups$zodSchema } from "./othergroups.js";
import { Person, Person$zodSchema } from "./person.js";
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
import { Search, Search$zodSchema } from "./search.js";
import {
  SuggestedSearch,
  SuggestedSearch$zodSchema,
} from "./suggestedsearch.js";

/**
 * Everything known about one person, and where else in the environment they appear.
 */
export type PersonReport = {
  person: Person;
  profiles: Array<ScreeningProfile>;
  findings: Array<ScreeningFinding>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  reviews: Array<PersonReview>;
  lookup?: ScreeningLookup | undefined;
  searches?: Array<Search> | undefined;
  suggested_searches: Array<SuggestedSearch>;
  other_groups: OtherGroups;
  evidence_restricted?: boolean | undefined;
};

export const PersonReport$zodSchema: z.ZodType<PersonReport> = z.object({
  evidence_restricted: z.boolean().optional().describe(
    "True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.",
  ),
  findings: z.array(ScreeningFinding$zodSchema).describe(
    "What this result flagged, most severe first, each citing its evidence.",
  ),
  lookup: ScreeningLookup$zodSchema.optional().describe(
    "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.",
  ),
  media: z.array(ScreeningMedia$zodSchema).describe(
    "All images and videos retained for this result, including media that no finding cites.",
  ),
  other_groups: OtherGroups$zodSchema.describe(
    "Where else in the environment the person appears, read live from those groups: deleting one removes it here.",
  ),
  person: Person$zodSchema.describe(
    "A person and where their screening and review stand.",
  ),
  posts: z.array(ScreeningPost$zodSchema).describe(
    "All posts retained for this result, including posts that no finding cites.",
  ),
  profiles: z.array(ScreeningProfile$zodSchema).describe(
    "The accounts this result matched, with how each was matched.",
  ),
  reviews: z.array(PersonReview$zodSchema).describe(
    "Every recorded decision, oldest first.",
  ),
  searches: z.array(Search$zodSchema).optional().describe(
    "The searches on this person's values in this group, newest first: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.",
  ),
  suggested_searches: z.array(SuggestedSearch$zodSchema).describe(
    "The searches enrichment would start on this person in this group, likeliest record first. Group screening follows the environment's enrichment setting, with suggest as its mode while the workspace has not set one. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied.",
  ),
}).describe(
  "Everything known about one person, and where else in the environment they appear.",
);
