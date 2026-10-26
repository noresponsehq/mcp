import * as z from "zod";
import {
  AttributeAgreement,
  AttributeAgreement$zodSchema,
} from "./attributeagreement.js";

export type FootprintCoherence = {
  birth_date?: AttributeAgreement | undefined;
  gender?: AttributeAgreement | undefined;
  nationality?: AttributeAgreement | undefined;
  country?: AttributeAgreement | undefined;
  city?: AttributeAgreement | undefined;
  zip?: AttributeAgreement | undefined;
  name?: AttributeAgreement | undefined;
  company?: AttributeAgreement | undefined;
  website?: AttributeAgreement | undefined;
  social?: AttributeAgreement | undefined;
};

export const FootprintCoherence$zodSchema: z.ZodType<FootprintCoherence> = z
  .object({
    birth_date: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    city: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    company: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    country: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    gender: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    name: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    nationality: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    social: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    website: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
    zip: AttributeAgreement$zodSchema.optional().describe(
      "How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.",
    ),
  });
