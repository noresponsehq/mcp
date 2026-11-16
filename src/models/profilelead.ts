import * as z from "zod";
import {
  ProfileCitation,
  ProfileCitation$zodSchema,
} from "./profilecitation.js";

export type ProfileLead = {
  value: string;
  kind: string;
  why: string;
  evidence: Array<ProfileCitation>;
};

export const ProfileLead$zodSchema: z.ZodType<ProfileLead> = z.object({
  evidence: z.array(ProfileCitation$zodSchema),
  kind: z.string(),
  value: z.string().describe(
    "A value copied exactly from a linked record that the person was not searched by.",
  ),
  why: z.string(),
});
