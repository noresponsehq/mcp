import * as z from "zod";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$zodSchema,
} from "./identifiersearchkind.js";
import { Match, Match$zodSchema } from "./match.js";
import { Namespace, Namespace$zodSchema } from "./namespace.js";
import { Provenance, Provenance$zodSchema } from "./provenance.js";

/**
 * One satisfied unique term in an identifier expression. term_index is the zero-based depth-first raw leaf position of its first occurrence. Duplicate normalized terms produce one witness. All satisfied unique terms are returned, ordered by term_index, including satisfied terms in an OR branch that was not needed. value preserves the original submitted value in assessment_id. In assessment scope all witnesses belong to the same matching assessment; account search chooses the newest such assessment. In account scope each term uses its newest retained matching assessment, so witnesses may have different assessment IDs. This evidence does not assert ownership or equality between accounts.
 */
export type IdentifierTermMatch = {
  kind: IdentifierSearchKind;
  value: string;
  match_basis: Match;
  provenance: Provenance;
  namespace?: Namespace | undefined;
  assessment_id: string;
  term_index: number;
};

export const IdentifierTermMatch$zodSchema: z.ZodType<IdentifierTermMatch> = z
  .object({
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
    term_index: z.int().describe(
      "Zero-based depth-first position of the first occurrence of this normalized term in the submitted expression.",
    ),
    value: z.string(),
  }).describe(
    "One satisfied unique term in an identifier expression. term_index is the zero-based depth-first raw leaf position of its first occurrence. Duplicate normalized terms produce one witness. All satisfied unique terms are returned, ordered by term_index, including satisfied terms in an OR branch that was not needed. value preserves the original submitted value in assessment_id. In assessment scope all witnesses belong to the same matching assessment; account search chooses the newest such assessment. In account scope each term uses its newest retained matching assessment, so witnesses may have different assessment IDs. This evidence does not assert ownership or equality between accounts.",
  );
