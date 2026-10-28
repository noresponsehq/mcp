import * as z from "zod";

/**
 * The identifiers an assessment was sent: each member of the request's identifiers object exactly as received, before the server normalised it (the email domain keeps its case, the name its Unicode form). A member the request did not send is absent. NoResponse keeps them encrypted under the workspace's own key, does not index or log them, and deletes them with the assessment: on DELETE of the assessment or its account, at its expires_at, and with the workspace.
 */
export type SentIdentifiers = {
  email?: string | undefined;
  username?: string | undefined;
  phone?: string | undefined;
  name?: string | undefined;
  ip?: string | undefined;
};

export const SentIdentifiers$zodSchema: z.ZodType<SentIdentifiers> = z.object({
  email: z.string().optional().describe(
    "identifiers.email as the request sent it.",
  ),
  ip: z.string().optional().describe("identifiers.ip as the request sent it."),
  name: z.string().optional().describe(
    "identifiers.name as the request sent it, before NFC normalisation.",
  ),
  phone: z.string().optional().describe(
    "identifiers.phone as the request sent it.",
  ),
  username: z.string().optional().describe(
    "identifiers.username as the request sent it.",
  ),
}).describe(
  "The identifiers an assessment was sent: each member of the request's identifiers object exactly as received, before the server normalised it (the email domain keeps its case, the name its Unicode form). A member the request did not send is absent. NoResponse keeps them encrypted under the workspace's own key, does not index or log them, and deletes them with the assessment: on DELETE of the assessment or its account, at its expires_at, and with the workspace.",
);
