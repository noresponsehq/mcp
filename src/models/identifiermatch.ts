import * as z from "zod";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$zodSchema,
} from "./identifiersearchkind.js";
import { Match, Match$zodSchema } from "./match.js";
import { Namespace, Namespace$zodSchema } from "./namespace.js";
import { Provenance, Provenance$zodSchema } from "./provenance.js";

/**
 * Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.
 */
export type IdentifierMatch = {
  kind: IdentifierSearchKind;
  value: string;
  match_basis: Match;
  provenance: Provenance;
  namespace?: Namespace | undefined;
  assessment_id: string;
};

export const IdentifierMatch$zodSchema: z.ZodType<IdentifierMatch> = z.object({
  assessment_id: z.string().describe(
    "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
  ),
  kind: IdentifierSearchKind$zodSchema,
  match_basis: Match$zodSchema.describe(
    "exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.",
  ),
  namespace: Namespace$zodSchema.optional().describe(
    "Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.",
  ),
  provenance: Provenance$zodSchema.describe(
    "Customer-submitted input. It does not mean the customer or NoResponse verified ownership.",
  ),
  value: z.string(),
}).describe(
  "Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.",
);
