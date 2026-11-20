import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const MatchedOn = {
  Email: "email",
  Phone: "phone",
} as const;
export type MatchedOn = ClosedEnum<typeof MatchedOn>;

export const MatchedOn$zodSchema = z.enum([
  "email",
  "phone",
]);

export type PersonMatch = { person_id: string; matched_on: Array<MatchedOn> };

export const PersonMatch$zodSchema: z.ZodType<PersonMatch> = z.object({
  matched_on: z.array(MatchedOn$zodSchema),
  person_id: z.string(),
});
