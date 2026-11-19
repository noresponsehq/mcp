import * as z from "zod";
import { Identifier, Identifier$zodSchema } from "./identifier.js";
import { SignalOutcome, SignalOutcome$zodSchema } from "./signaloutcome.js";

export type ScreeningLookupAnswer = {
  connector: string;
  identifier: Identifier;
  outcome: SignalOutcome;
  answered_at?: string | undefined;
};

export const ScreeningLookupAnswer$zodSchema: z.ZodType<ScreeningLookupAnswer> =
  z.object({
    answered_at: z.string().optional(),
    connector: z.string().describe(
      "The id of the connector asked: breach for the breach search.",
    ),
    identifier: Identifier$zodSchema,
    outcome: SignalOutcome$zodSchema.describe(
      "Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.",
    ),
  });
