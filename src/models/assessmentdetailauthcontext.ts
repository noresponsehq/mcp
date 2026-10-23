import * as z from "zod";
import { HookPoint, HookPoint$zodSchema } from "./hookpoint.js";
import { Transport, Transport$zodSchema } from "./transport.js";

/**
 * The identity fields of the auth context the assessment was made with, echoed for the tenant's own correlation: the request's auth_context, or the one a hosted provider hook (POST /hooks/{integration_id}) built, with transport provider_hook and its hook_point. Present exactly when the request carried an auth_context, and the same on every revision of the assessment. Values are as the request or the hook sent them; tokens, timestamps, roles and scopes are not echoed, and the echo does not change the score.
 */
export type AssessmentDetailAuthContext = {
  provider: string;
  issuer: string;
  subject?: string | undefined;
  session_id?: string | undefined;
  organization_id?: string | undefined;
  verified: boolean;
  transport: Transport;
  hook_point?: HookPoint | undefined;
};

export const AssessmentDetailAuthContext$zodSchema: z.ZodType<
  AssessmentDetailAuthContext
> = z.object({
  hook_point: HookPoint$zodSchema.optional().describe(
    "The provider event a provider_hook context was sent for; absent for any other transport.",
  ),
  issuer: z.string().describe("The issuer the context named."),
  organization_id: z.string().optional().describe(
    "The organization identifier the context named, when it named one.",
  ),
  provider: z.string().describe("The provider slug the context named."),
  session_id: z.string().optional().describe(
    "The session identifier the context named, when it named one.",
  ),
  subject: z.string().optional().describe(
    "The subject the context named; absent when it named none (a pre_registration hook).",
  ),
  transport: Transport$zodSchema.describe(
    "Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.",
  ),
  verified: z.boolean().describe(
    "The verified flag the context carried. A provider_hook context is always false.",
  ),
}).describe(
  "The identity fields of the auth context the assessment was made with, echoed for the tenant's own correlation: the request's auth_context, or the one a hosted provider hook (POST /hooks/{integration_id}) built, with transport provider_hook and its hook_point. Present exactly when the request carried an auth_context, and the same on every revision of the assessment. Values are as the request or the hook sent them; tokens, timestamps, roles and scopes are not echoed, and the echo does not change the score.",
);
