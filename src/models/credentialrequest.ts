import * as z from "zod";

/**
 * Associate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict.
 */
export type CredentialRequest = { sha256: string };

export const CredentialRequest$zodSchema: z.ZodType<CredentialRequest> = z
  .object({
    sha256: z.string(),
  }).describe(
    "Associate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict.",
  );
