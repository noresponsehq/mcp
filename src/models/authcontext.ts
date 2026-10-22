import * as z from "zod";
import { AssuranceLevel, AssuranceLevel$zodSchema } from "./assurancelevel.js";
import { AuthContextMfa, AuthContextMfa$zodSchema } from "./authcontextmfa.js";
import { HookPoint, HookPoint$zodSchema } from "./hookpoint.js";
import { Transport, Transport$zodSchema } from "./transport.js";

/**
 * Normalised claims from a session your backend has already verified with WorkOS, Clerk, Auth0 or any OIDC provider. Pass the output of the SDK's auth adapters, not a raw token.
 */
export type AuthContext = {
  provider: string;
  issuer: string;
  audience?: string | undefined;
  audiences?: Array<string> | undefined;
  subject: string;
  session_id?: string | undefined;
  organization_id?: string | undefined;
  tenant_id?: string | undefined;
  token_id?: string | undefined;
  issued_at?: string | undefined;
  expires_at?: string | undefined;
  session_created_at?: string | undefined;
  auth_time?: string | undefined;
  account_created_at?: string | undefined;
  email_verified?: boolean | undefined;
  phone_verified?: boolean | undefined;
  assurance_level?: AssuranceLevel | undefined;
  impersonated?: boolean | undefined;
  transport?: Transport | undefined;
  hook_point?: HookPoint | undefined;
  verified: boolean;
  mfa?: AuthContextMfa | undefined;
  roles?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
};

export const AuthContext$zodSchema: z.ZodType<AuthContext> = z.object({
  account_created_at: z.string().optional().describe(
    "Account creation time from the customer's verified provider record, when available.",
  ),
  assurance_level: AssuranceLevel$zodSchema.optional().describe(
    "Provider or OIDC assurance level, when the customer has mapped one.",
  ),
  audience: z.string().optional().describe(
    "The verified audience/resource identifier used by the customer's API. Use audiences when the provider emits multiple values.",
  ),
  audiences: z.array(z.string()).optional().describe(
    "All verified audience/resource identifiers from an OAuth or OIDC token. The first value may also be copied to audience for simple integrations.",
  ),
  auth_time: z.string().optional().describe(
    "Verified end-user authentication time (`auth_time`), when present.",
  ),
  email_verified: z.boolean().optional().describe(
    "Whether the customer's provider asserts that the email identifier was verified.",
  ),
  expires_at: z.string().optional().describe("Verified token expiry (`exp`)."),
  hook_point: HookPoint$zodSchema.optional().describe(
    "The provider event a provider_hook context was sent for. pre_registration runs before the user exists, so subject and the request's account_id may be absent there. Sent only with transport provider_hook.",
  ),
  impersonated: z.boolean().optional().describe(
    "Whether the verified session is acting on behalf of another subject.",
  ),
  issued_at: z.string().optional().describe(
    "Verified token issue time (`iat`).",
  ),
  issuer: z.string().describe(
    "The verified token issuer, normally the provider's HTTPS issuer URL.",
  ),
  mfa: AuthContextMfa$zodSchema.optional().describe(
    "Normalized multi-factor evidence from a verified provider session.",
  ),
  organization_id: z.string().optional().describe(
    "The active organization or workspace identifier, when the provider issued one.",
  ),
  phone_verified: z.boolean().optional().describe(
    "Whether the customer's provider asserts that the phone identifier was verified.",
  ),
  provider: z.string().describe(
    "Lowercase provider slug. WorkOS, Clerk and Auth0 have first-class adapters; every other provider uses a customer-specific OIDC slug. Provider brand is metadata; it does not change risk by itself.",
  ),
  roles: z.array(z.string()).optional().describe(
    "Bounded role slugs from the verified provider; roles do not change risk by themselves.",
  ),
  scopes: z.array(z.string()).optional().describe(
    "Bounded scopes from the verified access token; scopes do not change risk by themselves.",
  ),
  session_created_at: z.string().optional().describe(
    "Creation time of the provider session from the verified backend session record (for example Clerk Session.createdAt or WorkOS Session.created_at). This is separate from token issuance and auth_time.",
  ),
  session_id: z.string().optional().describe(
    "The verified session identifier (`sid` or provider equivalent).",
  ),
  subject: z.string().describe(
    "The verified stable subject identifier (`sub`), opaque to NoResponse. Required, except from a provider hook at pre_registration, where no user exists yet.",
  ),
  tenant_id: z.string().optional().describe(
    "The provider tenant identifier, when distinct from organization_id.",
  ),
  token_id: z.string().optional().describe(
    "The verified token identifier (`jti`), used for replay and rotation correlation.",
  ),
  transport: Transport$zodSchema.optional().describe(
    "Where this context was derived. Backend is the trusted integration path; browser values are treated as weak hints. provider_hook is a hosted provider hook (an Auth0 or WorkOS Action) calling at hook_point; it needs hook_point and verified false, and its authentication facts are not scored.",
  ),
  verified: z.boolean().describe(
    "Whether the customer completed signature, issuer, audience and expiry validation before calling NoResponse. False contexts are accepted only as weak hints.",
  ),
}).describe(
  "Normalised claims from a session your backend has already verified with WorkOS, Clerk, Auth0 or any OIDC provider. Pass the output of the SDK's auth adapters, not a raw token.",
);
