import * as z from "zod";
import { Direction, Direction$zodSchema } from "./direction.js";
import { Impact, Impact$zodSchema } from "./impact.js";
import { ReasonCode, ReasonCode$zodSchema } from "./reasoncode.js";
import {
  ReasonIdentifier,
  ReasonIdentifier$zodSchema,
} from "./reasonidentifier.js";

/**
 * One reason that fired. direction is whether it raises or lowers the score, or is neutral (informational, it moves nothing). impact is a coarse band of how much it moves the score: none for a neutral reason, otherwise low, medium or high.
 */
export type RiskReason = {
  code: ReasonCode;
  direction: Direction;
  impact: Impact;
  identifier?: ReasonIdentifier | undefined;
  list_entry_id?: string | undefined;
};

export const RiskReason$zodSchema: z.ZodType<RiskReason> = z.object({
  code: ReasonCode$zodSchema.describe(
    "A stable reason code. New codes may appear; ignore any you do not know.",
  ),
  direction: Direction$zodSchema,
  identifier: ReasonIdentifier$zodSchema.optional().describe(
    "The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.",
  ),
  impact: Impact$zodSchema.describe(
    "The selected reason's served impact band. Requires reason.",
  ),
  list_entry_id: z.string().optional().describe(
    "The list entry a list_match reason applied. No other reason carries it.",
  ),
}).describe(
  "One reason that fired. direction is whether it raises or lowers the score, or is neutral (informational, it moves nothing). impact is a coarse band of how much it moves the score: none for a neutral reason, otherwise low, medium or high.",
);
