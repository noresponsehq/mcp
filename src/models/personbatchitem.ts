import * as z from "zod";
import {
  PersonBatchItemOutcome,
  PersonBatchItemOutcome$zodSchema,
} from "./personbatchitemoutcome.js";

export type PersonBatchItem = {
  index: number;
  id: string;
  outcome: PersonBatchItemOutcome;
};

export const PersonBatchItem$zodSchema: z.ZodType<PersonBatchItem> = z.object({
  id: z.string(),
  index: z.int().describe("The row's position in the request."),
  outcome: PersonBatchItemOutcome$zodSchema.describe(
    "unchanged: the row matched a person with the same details.",
  ),
});
