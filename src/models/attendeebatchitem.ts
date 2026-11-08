import * as z from "zod";
import {
  AttendeeBatchItemOutcome,
  AttendeeBatchItemOutcome$zodSchema,
} from "./attendeebatchitemoutcome.js";

export type AttendeeBatchItem = {
  index: number;
  id: string;
  outcome: AttendeeBatchItemOutcome;
};

export const AttendeeBatchItem$zodSchema: z.ZodType<AttendeeBatchItem> = z
  .object({
    id: z.string(),
    index: z.int().describe("The row's position in the request."),
    outcome: AttendeeBatchItemOutcome$zodSchema.describe(
      "unchanged: the row matched an attendee with the same details.",
    ),
  });
