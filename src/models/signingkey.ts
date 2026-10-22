import * as z from "zod";

/**
 * One signing key, by id. The secret is not included.
 */
export type SigningKey = {
  key_id: string;
  created_at: string;
  expires_at?: string | undefined;
};

export const SigningKey$zodSchema: z.ZodType<SigningKey> = z.object({
  created_at: z.string(),
  expires_at: z.string().optional().describe(
    "Present on a key a rotation replaced: it stops verifying at this instant, 7 days after the rotation. Absent on the key that signs.",
  ),
  key_id: z.string().describe(
    "The signing key id, sent as NR-Webhook-Key-Id on every delivery it signs.",
  ),
}).describe("One signing key, by id. The secret is not included.");
