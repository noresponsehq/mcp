import * as z from "zod";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$zodSchema,
} from "./identifiersearchkind.js";
import {
  IdentifierSubmission,
  IdentifierSubmission$zodSchema,
} from "./identifiersubmission.js";
import { Match, Match$zodSchema } from "./match.js";
import { Namespace, Namespace$zodSchema } from "./namespace.js";
import { Provenance, Provenance$zodSchema } from "./provenance.js";

export type SharedIdentifier = {
  kind: IdentifierSearchKind;
  match_basis: Match;
  provenance: Provenance;
  namespace?: Namespace | undefined;
  account: IdentifierSubmission;
  linked_account: IdentifierSubmission;
};

export const SharedIdentifier$zodSchema: z.ZodType<SharedIdentifier> = z.object(
  {
    account: IdentifierSubmission$zodSchema,
    kind: IdentifierSearchKind$zodSchema,
    linked_account: IdentifierSubmission$zodSchema,
    match_basis: Match$zodSchema.describe(
      "exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.",
    ),
    namespace: Namespace$zodSchema.optional().describe(
      "Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.",
    ),
    provenance: Provenance$zodSchema.describe(
      "Customer-submitted input. It does not mean the customer or NoResponse verified ownership.",
    ),
  },
);
