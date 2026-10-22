import * as z from "zod";
import { Platform, Platform$zodSchema } from "./platform.js";

/**
 * Optional context observed by your signup client. The server parses these hints into coarse features, leaves raw user_agent and opaque ids out of every answer, and weighs a mismatch with the other evidence.
 */
export type AssessmentRequestClientContext = {
  timezone?: string | undefined;
  locale?: string | undefined;
  platform?: Platform | undefined;
  app_version?: string | undefined;
  user_agent?: string | undefined;
  device_id?: string | undefined;
  session_id?: string | undefined;
  form_duration_ms?: number | undefined;
  client_observed_at?: string | undefined;
};

export const AssessmentRequestClientContext$zodSchema: z.ZodType<
  AssessmentRequestClientContext
> = z.object({
  app_version: z.string().optional().describe(
    "Customer application version, without build metadata that contains secrets.",
  ),
  client_observed_at: z.string().optional().describe(
    "RFC 3339 timestamp observed by the client. Server ingress time remains authoritative; a large clock skew is only a low-confidence feature.",
  ),
  device_id: z.string().optional().describe(
    "Tenant-scoped opaque identifier your application mints and rotates when the account or device changes. Send an id of your own, not a hardware fingerprint.",
  ),
  form_duration_ms: z.int().optional().describe(
    "Elapsed time from form start to submit. Values below three seconds are a weak automation hint, weighed with the other evidence.",
  ),
  locale: z.string().optional().describe(
    "BCP 47 locale, for example en-AU. Treat as a presentation hint, not a nationality signal.",
  ),
  platform: Platform$zodSchema.optional().describe(
    "Client platform. Closed vocabulary keeps integrations stable.",
  ),
  session_id: z.string().optional().describe(
    "Opaque signup session identifier. It is used for tenant-scoped velocity and replay checks only.",
  ),
  timezone: z.string().optional().describe(
    "IANA time-zone name such as Europe/London or America/Los_Angeles. Fixed numeric offsets are not accepted.",
  ),
  user_agent: z.string().optional().describe(
    "The raw User-Agent header of the signup request, at most 512 characters. It is parsed into coarse features and left out of every answer.",
  ),
}).describe(
  "Optional context observed by your signup client. The server parses these hints into coarse features, leaves raw user_agent and opaque ids out of every answer, and weighs a mismatch with the other evidence.",
);
