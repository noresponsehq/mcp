import * as z from "zod";
import {
  FootprintCoherence,
  FootprintCoherence$zodSchema,
} from "./footprintcoherence.js";
import {
  FootprintFamily,
  FootprintFamily$zodSchema,
} from "./footprintfamily.js";
import {
  FootprintTimeline,
  FootprintTimeline$zodSchema,
} from "./footprinttimeline.js";

/**
 * How long and how widely the signup's email and username have existed, and how far independent sources agree on the person behind them, in years and counts only. families are the kinds of evidence that found either identifier. Omitted when nothing found them: a footprint lookup that failed makes no claim, and absence is no_digital_footprint's to state.
 */
export type Footprint = {
  email?: FootprintTimeline | undefined;
  username?: FootprintTimeline | undefined;
  families: Array<FootprintFamily>;
  coherence?: FootprintCoherence | undefined;
};

export const Footprint$zodSchema: z.ZodType<Footprint> = z.object({
  coherence: FootprintCoherence$zodSchema.optional(),
  email: FootprintTimeline$zodSchema.optional().describe(
    "One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.",
  ),
  families: z.array(FootprintFamily$zodSchema),
  username: FootprintTimeline$zodSchema.optional().describe(
    "One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.",
  ),
}).describe(
  "How long and how widely the signup's email and username have existed, and how far independent sources agree on the person behind them, in years and counts only. families are the kinds of evidence that found either identifier. Omitted when nothing found them: a footprint lookup that failed makes no claim, and absence is no_digital_footprint's to state.",
);
