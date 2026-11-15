import * as z from "zod";
import {
  PersonBatchItemOutcome,
  PersonBatchItemOutcome$zodSchema,
} from "./personbatchitemoutcome.js";
import { PersonMatch, PersonMatch$zodSchema } from "./personmatch.js";

export type PersonBatchItem = {
  index: number;
  id: string;
  outcome: PersonBatchItemOutcome;
  suggested_matches?: Array<PersonMatch> | undefined;
};

export const PersonBatchItem$zodSchema: z.ZodType<PersonBatchItem> = z.object({
  id: z.string(),
  index: z.int().describe("The row's position in the request."),
  outcome: PersonBatchItemOutcome$zodSchema.describe(
    "unchanged: the row matched a person with the same details.",
  ),
  suggested_matches: z.array(PersonMatch$zodSchema).optional(),
});
