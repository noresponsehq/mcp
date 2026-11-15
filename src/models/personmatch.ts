import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const PersonMatchMatchedOn = {
  Email: "email",
  Phone: "phone",
} as const;
export type PersonMatchMatchedOn = ClosedEnum<typeof PersonMatchMatchedOn>;

export const PersonMatchMatchedOn$zodSchema = z.enum([
  "email",
  "phone",
]);

export type PersonMatch = {
  person_id: string;
  matched_on: Array<PersonMatchMatchedOn>;
};

export const PersonMatch$zodSchema: z.ZodType<PersonMatch> = z.object({
  matched_on: z.array(PersonMatchMatchedOn$zodSchema),
  person_id: z.string(),
});
