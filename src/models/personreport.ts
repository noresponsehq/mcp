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
  other_groups: OtherGroups;
};

export const PersonReport$zodSchema: z.ZodType<PersonReport> = z.object({
  findings: z.array(ScreeningFinding$zodSchema).describe(
    "What the latest screening flagged, most severe first, each citing its evidence.",
  ),
  lookup: ScreeningLookup$zodSchema.optional().describe(
    "What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.",
  ),
  media: z.array(ScreeningMedia$zodSchema).describe(
    "The images and videos the findings cite.",
  ),
  other_groups: OtherGroups$zodSchema.describe(
    "Where else in the environment the person appears, read live from those groups: deleting one removes it here.",
  ),
  person: Person$zodSchema.describe(
    "A person and where their screening and review stand.",
  ),
  posts: z.array(ScreeningPost$zodSchema).describe(
    "The posts the findings cite.",
  ),
  profiles: z.array(ScreeningProfile$zodSchema).describe(
    "The accounts the latest screening matched, with how each was matched.",
  ),
  reviews: z.array(PersonReview$zodSchema).describe(
    "Every recorded decision, oldest first.",
  ),
  searches: z.array(Search$zodSchema).optional().describe(
    "The searches people started on this person's values, newest first: each names the value, and the record and field it came from. Absent when nobody searched.",
  ),
}).describe(
  "Everything known about one person, and where else in the environment they appear.",
);
