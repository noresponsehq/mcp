import * as z from "zod";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$zodSchema,
} from "./identifiersearchkind.js";
import { Match, Match$zodSchema } from "./match.js";
import { Namespace, Namespace$zodSchema } from "./namespace.js";

/**
 * One customer-submitted identifier. Defaults to exact comparison of the original submitted value. canonical uses the supported identifier normalisation without an ownership claim: email preserves local-part case, NFC-normalises it and lowercases the domain without removing dots or tags; phone uses international E.164 without extensions or an inferred region; username uses NFC and Unicode case folding within the customer namespace. mailbox is email-only and explicitly selects existing list rules: case-insensitive, remove +tag, and ignore local-part dots at gmail.com and googlemail.com; googlemail.com maps to gmail.com. Username requires namespace customer. Email and phone forbid namespace. Source-discovered identifiers and platform handles are not searched. Unsupported kinds, namespaces, modes and invalid values return 400. Search equality does not establish verified ownership or merge accounts.
 */
export type IdentifierSearch = {
  kind: IdentifierSearchKind;
  value: string;
  match?: Match | undefined;
  namespace?: Namespace | undefined;
};

export const IdentifierSearch$zodSchema: z.ZodType<IdentifierSearch> = z.object(
  {
    kind: IdentifierSearchKind$zodSchema,
    match: Match$zodSchema.optional().describe(
      "exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.",
    ),
    namespace: Namespace$zodSchema.optional().describe(
      "Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.",
    ),
    value: z.string().describe(
      "The comparison value. Stored original identifiers remain unchanged. An invalid identifier is refused instead of returning an empty result.",
    ),
  },
).describe(
  "One customer-submitted identifier. Defaults to exact comparison of the original submitted value. canonical uses the supported identifier normalisation without an ownership claim: email preserves local-part case, NFC-normalises it and lowercases the domain without removing dots or tags; phone uses international E.164 without extensions or an inferred region; username uses NFC and Unicode case folding within the customer namespace. mailbox is email-only and explicitly selects existing list rules: case-insensitive, remove +tag, and ignore local-part dots at gmail.com and googlemail.com; googlemail.com maps to gmail.com. Username requires namespace customer. Email and phone forbid namespace. Source-discovered identifiers and platform handles are not searched. Unsupported kinds, namespaces, modes and invalid values return 400. Search equality does not establish verified ownership or merge accounts.",
);
