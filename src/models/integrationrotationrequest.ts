import * as z from "zod";

/**
 * POST /v1/integrations/{integration_id}/rotate body. For an Auth0 integration send {}: NoResponse generates a new shared secret and returns it once. For a WorkOS or Supabase integration send the new signing_secret after regenerating it in the provider's dashboard. Either way the previous secret is still accepted for 24 hours, so the provider can be switched over without a refused call.
 */
export type IntegrationRotationRequest = {
  signing_secret?: string | undefined;
};

export const IntegrationRotationRequest$zodSchema: z.ZodType<
  IntegrationRotationRequest
> = z.object({
  signing_secret: z.string().optional().describe(
    "The WorkOS Actions signing secret or the Supabase hook secret, as the provider's dashboard shows it: 16 to 256 printable ASCII characters with no spaces. It is stored sealed and is not returned.",
  ),
}).describe(
  "POST /v1/integrations/{integration_id}/rotate body. For an Auth0 integration send {}: NoResponse generates a new shared secret and returns it once. For a WorkOS or Supabase integration send the new signing_secret after regenerating it in the provider's dashboard. Either way the previous secret is still accepted for 24 hours, so the provider can be switched over without a refused call.",
);
