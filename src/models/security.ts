import * as z from "zod";

export type Security = { apiKey: string };

export const Security$zodSchema: z.ZodType<Security> = z.object({
  apiKey: z.string().describe(
    "Your API key, sent as `Authorization: Bearer <key>`. A key selects one workspace environment. Each operation declares its required scope. People-read access includes evidence by default, subject to explicit evidence restrictions. Rotate with POST /v1/keys/rotate. A missing, malformed, revoked or expired key answers 401; a key without the operation's scope answers 403.",
  ),
});
