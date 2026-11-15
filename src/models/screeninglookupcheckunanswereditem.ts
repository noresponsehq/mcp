import * as z from "zod";
import { FailureReason, FailureReason$zodSchema } from "./failurereason.js";

export type ScreeningLookupCheckUnansweredItem = {
  connector: string;
  reason: FailureReason;
};

export const ScreeningLookupCheckUnansweredItem$zodSchema: z.ZodType<
  ScreeningLookupCheckUnansweredItem
> = z.object({
  connector: z.string().describe(
    "The id of the connector that did not answer: breach for the breach search.",
  ),
  reason: FailureReason$zodSchema.describe(
    "Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.",
  ),
});
