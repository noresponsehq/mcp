import * as z from "zod";
import { Agreement, Agreement$zodSchema } from "./agreement.js";

/**
 * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
 */
export type AttributeAgreement = {
  agreement: Agreement;
  values: number;
  support: number;
};

export const AttributeAgreement$zodSchema: z.ZodType<AttributeAgreement> = z
  .object({
    agreement: Agreement$zodSchema,
    support: z.int(),
    values: z.int(),
  }).describe(
    "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
  );
