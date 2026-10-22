import * as z from "zod";
import {
  ConsistencyValue,
  ConsistencyValue$zodSchema,
} from "./consistencyvalue.js";
import { Country, Country$zodSchema } from "./country.js";

/**
 * Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.
 */
export type Consistency = {
  name?: ConsistencyValue | undefined;
  phone?: ConsistencyValue | undefined;
  ip?: ConsistencyValue | undefined;
  country?: Country | undefined;
};

export const Consistency$zodSchema: z.ZodType<Consistency> = z.object({
  country: Country$zodSchema.optional().describe(
    "IP country, phone country, breach countries and policy_context.region together.",
  ),
  ip: ConsistencyValue$zodSchema.optional().describe(
    "How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.",
  ),
  name: ConsistencyValue$zodSchema.optional().describe(
    "How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.",
  ),
  phone: ConsistencyValue$zodSchema.optional().describe(
    "How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.",
  ),
}).describe(
  "Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.",
);
