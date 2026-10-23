import * as z from "zod";

/**
 * POST /v1/keys/rotate body. The workspace and the key being rotated are the API key that signs the request, so neither is a body member. An empty object takes the default overlap.
 */
export type KeyRotationRequest = { overlap_seconds?: number | undefined };

export const KeyRotationRequest$zodSchema: z.ZodType<KeyRotationRequest> = z
  .object({
    overlap_seconds: z.int().optional().describe(
      "How long the presented key keeps working beside the new one, from 60 seconds to 7 days. Default 86400 (24 hours). At the end of the overlap the presented key stops authenticating.",
    ),
  }).describe(
    "POST /v1/keys/rotate body. The workspace and the key being rotated are the API key that signs the request, so neither is a body member. An empty object takes the default overlap.",
  );
