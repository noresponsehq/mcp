import * as z from "zod";
import {
  SuggestedSearchKind,
  SuggestedSearchKind$zodSchema,
} from "./suggestedsearchkind.js";

/**
 * A search enrichment would start: a distinctive or unique value of a likely record, not yet searched for the person. A person starts it with POST .../searches, naming the record and the field.
 */
export type SuggestedSearch = {
  record_id: string;
  field: string;
  kind: SuggestedSearchKind;
  likelihood: number;
};

export const SuggestedSearch$zodSchema: z.ZodType<SuggestedSearch> = z.object({
  field: z.string().describe(
    "The field of that record that holds the value. Send record_id and field to POST .../searches to start the search.",
  ),
  kind: SuggestedSearchKind$zodSchema.describe(
    "The kind of the value: one of the kinds the environment's enrichment setting names.",
  ),
  likelihood: z.number().describe(
    "The likelihood of the record that holds the value, from 0.01 to 0.99. Enrichment suggests a value only from a record more likely than the setting's min_likelihood, the likeliest first.",
  ),
  record_id: z.string().describe(
    "The lookup record whose value enrichment would search. It is among the report's lookup records.",
  ),
}).describe(
  "A search enrichment would start: a distinctive or unique value of a likely record, not yet searched for the person. A person starts it with POST .../searches, naming the record and the field.",
);
