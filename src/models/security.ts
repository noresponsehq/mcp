import * as z from "zod";

export type Security = { apiKey: string };

export const Security$zodSchema: z.ZodType<Security> = z.object({
  apiKey: z.string().describe(
    "Your API key, sent as `Authorization: Bearer <key>`. Keys are opaque, scoped (assess, history, webhooks, and optionally detailed) and identify one tenant. Rotate with POST /v1/keys/rotate. A missing, malformed, revoked or expired key answers 401; a key without the operation's scope answers 403.",
  ),
});
