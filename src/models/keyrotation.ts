import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Scope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
} as const;
export type Scope = ClosedEnum<typeof Scope>;

export const Scope$zodSchema = z.enum([
  "assess",
  "history",
  "delete",
  "webhooks",
  "detailed",
  "integrations",
]);

/**
 * The 201 answer of POST /v1/keys/rotate: the new key, shown once, and when the key that was presented stops working. The new key has the scopes and the environment of the presented key.
 */
export type KeyRotation = {
  key: string;
  key_id: string;
  scopes: Array<Scope>;
  created_at: string;
  previous_key_id: string;
  previous_key_expires_at: string;
};

export const KeyRotation$zodSchema: z.ZodType<KeyRotation> = z.object({
  created_at: z.string(),
  key: z.string().describe(
    "The new credential, nrk_<mode>_<key id>_<secret>, in the environment of the presented key: nrk_live_ or nrk_test_. It is shown only in this answer; store it now.",
  ),
  key_id: z.string().describe("The public id of the new key."),
  previous_key_expires_at: z.string().describe(
    "When the previous key stops authenticating. Until then both keys work.",
  ),
  previous_key_id: z.string().describe(
    "The id of the key that signed this request.",
  ),
  scopes: z.array(Scope$zodSchema).describe(
    "The scopes of the new key: those of the presented key.",
  ),
}).describe(
  "The 201 answer of POST /v1/keys/rotate: the new key, shown once, and when the key that was presented stops working. The new key has the scopes and the environment of the presented key.",
);
