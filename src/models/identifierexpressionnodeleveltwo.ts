import * as z from "zod";
import {
  IdentifierExpressionNodeLevelOne,
  IdentifierExpressionNodeLevelOne$zodSchema,
} from "./identifierexpressionnodelevelone.js";
import {
  IdentifierSearch,
  IdentifierSearch$zodSchema,
} from "./identifiersearch.js";

export type IdentifierExpressionNodeLevelTwo = {
  term?: IdentifierSearch | undefined;
  and?: Array<IdentifierExpressionNodeLevelOne> | undefined;
  or?: Array<IdentifierExpressionNodeLevelOne> | undefined;
};

export const IdentifierExpressionNodeLevelTwo$zodSchema: z.ZodType<
  IdentifierExpressionNodeLevelTwo
> = z.object({
  and: z.array(IdentifierExpressionNodeLevelOne$zodSchema).optional(),
  or: z.array(IdentifierExpressionNodeLevelOne$zodSchema).optional(),
  term: IdentifierSearch$zodSchema.optional().describe(
    "One customer-submitted identifier. Defaults to exact comparison of the original submitted value. canonical uses the supported identifier normalisation without an ownership claim: email preserves local-part case, NFC-normalises it and lowercases the domain without removing dots or tags; phone uses international E.164 without extensions or an inferred region; username uses NFC and Unicode case folding within the customer namespace. mailbox is email-only and explicitly selects existing list rules: case-insensitive, remove +tag, and ignore local-part dots at gmail.com and googlemail.com; googlemail.com maps to gmail.com. Username requires namespace customer. Email and phone forbid namespace. Source-discovered identifiers and platform handles are not searched. Unsupported kinds, namespaces, modes and invalid values return 400. Search equality does not establish verified ownership or merge accounts.",
  ),
});
