import * as z from "zod";
import {
  IncompleteReason,
  IncompleteReason$zodSchema,
} from "./incompletereason.js";
import { Lane, Lane$zodSchema } from "./lane.js";

/**
 * One evidence lane that did not settle, and why. It names a lane, not a source. A lane that missed its deadline is timed_out rather than not_found.
 */
export type IncompleteSource = { lane: Lane; reason: IncompleteReason };

export const IncompleteSource$zodSchema: z.ZodType<IncompleteSource> = z.object(
  {
    lane: Lane$zodSchema.describe(
      "An evidence lane: accounts (account presence for email and username), phone, breach and ip.",
    ),
    reason: IncompleteReason$zodSchema.describe(
      "Why a lane did not settle. deferred means the lane is asynchronous and still running; a continuation settles it. timed_out means the lane missed its deadline. insufficient_evidence is a settled inconclusive signal rather than an incomplete lane.",
    ),
  },
).describe(
  "One evidence lane that did not settle, and why. It names a lane, not a source. A lane that missed its deadline is timed_out rather than not_found.",
);
