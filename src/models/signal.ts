import * as z from "zod";
import { FailureReason, FailureReason$zodSchema } from "./failurereason.js";
import { Freshness, Freshness$zodSchema } from "./freshness.js";
import { IdentifierKind, IdentifierKind$zodSchema } from "./identifierkind.js";
import {
  PhoneEnrichment,
  PhoneEnrichment$zodSchema,
} from "./phoneenrichment.js";
import { SignalOutcome, SignalOutcome$zodSchema } from "./signaloutcome.js";

export type Signal = {
  type: string;
  identifier: IdentifierKind;
  outcome: SignalOutcome;
  source_id: string;
  reason?: FailureReason | undefined;
  evidence_ref?: string | undefined;
  observed_at?: string | undefined;
  last_checked_at?: string | undefined;
  freshness: Freshness;
  enrichment?: PhoneEnrichment | undefined;
};

export const Signal$zodSchema: z.ZodType<Signal> = z.object({
  enrichment: PhoneEnrichment$zodSchema.optional().describe(
    "Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.",
  ),
  evidence_ref: z.string().optional().describe(
    "Opaque pointer to evidence NoResponse holds for this signal. It carries no breach value, credential or page body.",
  ),
  freshness: Freshness$zodSchema.describe(
    "Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.",
  ),
  identifier: IdentifierKind$zodSchema.describe(
    "Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.",
  ),
  last_checked_at: z.string().optional().describe(
    "When the source was last queried for this identifier.",
  ),
  observed_at: z.string().optional().describe(
    "When the evidence was first observed.",
  ),
  outcome: SignalOutcome$zodSchema.describe(
    "Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.",
  ),
  reason: FailureReason$zodSchema.optional().describe(
    "Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.",
  ),
  source_id: z.string().describe(
    "Opaque, tenant-scoped projection of the source that produced a signal. It stays stable for your tenant while the projection key is unchanged and reveals no upstream provider, feed, breach table or source record.",
  ),
  type: z.string().describe(
    "Signal kind, for example account_presence or breach_exposure. New kinds may appear; ignore any you do not know.",
  ),
});
