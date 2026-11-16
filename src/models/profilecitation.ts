import * as z from "zod";
import {
  ProfileCitationKind,
  ProfileCitationKind$zodSchema,
} from "./profilecitationkind.js";

export type ProfileCitation = { kind: ProfileCitationKind; id: string };

export const ProfileCitation$zodSchema: z.ZodType<ProfileCitation> = z.object({
  id: z.string().describe(
    "The record or post id. For a check, c followed by its 1-based position in lookup.checks.",
  ),
  kind: ProfileCitationKind$zodSchema.describe(
    "record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.",
  ),
});
