import * as z from "zod";
import { LineType, LineType$zodSchema } from "./linetype.js";

export type RiskSummaryPhone = {
  line_type?: LineType | undefined;
  country?: string | undefined;
  report_count?: number | undefined;
  carrier?: string | undefined;
};

export const RiskSummaryPhone$zodSchema: z.ZodType<RiskSummaryPhone> = z.object(
  {
    carrier: z.string().optional().describe(
      "Carrier-network metadata from privately weighted sources; not upstream provider attribution.",
    ),
    country: z.string().optional(),
    line_type: LineType$zodSchema.optional(),
    report_count: z.int().optional().describe(
      "Highest report count any source gave for the number.",
    ),
  },
);
