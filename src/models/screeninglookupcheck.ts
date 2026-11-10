import * as z from "zod";
import { FailureReason, FailureReason$zodSchema } from "./failurereason.js";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$zodSchema,
} from "./identifiersearchkind.js";
import { Lane, Lane$zodSchema } from "./lane.js";
import {
  ScreeningLookupCheckStatus,
  ScreeningLookupCheckStatus$zodSchema,
} from "./screeninglookupcheckstatus.js";

/**
 * What came of one lane of the lookups for one identifier.
 */
export type ScreeningLookupCheck = {
  identifier: IdentifierSearchKind;
  lane: Lane;
  status: ScreeningLookupCheckStatus;
  sources: number;
  answered: number;
  found: number;
  reason?: FailureReason | undefined;
};

export const ScreeningLookupCheck$zodSchema: z.ZodType<ScreeningLookupCheck> = z
  .object({
    answered: z.int().describe("Sources that gave a definite answer."),
    found: z.int().describe("Sources that found the identifier."),
    identifier: IdentifierSearchKind$zodSchema,
    lane: Lane$zodSchema.describe(
      "An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.",
    ),
    reason: FailureReason$zodSchema.optional().describe(
      "Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.",
    ),
    sources: z.int().describe(
      "Sources asked: none when no source could be, as when the source is stopped or your workspace refuses it.",
    ),
    status: ScreeningLookupCheckStatus$zodSchema.describe(
      "found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.",
    ),
  }).describe("What came of one lane of the lookups for one identifier.");
