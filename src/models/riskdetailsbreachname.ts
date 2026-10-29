import * as z from "zod";

export type RiskDetailsBreachName = {
  value: string;
  seen_in: number;
  sites?: Array<string> | undefined;
  unsited?: number | undefined;
};

export const RiskDetailsBreachName$zodSchema: z.ZodType<RiskDetailsBreachName> =
  z.object({
    seen_in: z.int(),
    sites: z.array(z.string()).optional().describe(
      "The domains of the breached sites whose tables hold the name, lower case, each once, newest breach first, at most 32: the domain values of breaches[]. Covers the email's and the username's tables together. Absent when none of the tables has a site.",
    ),
    unsited: z.int().optional().describe(
      "How many of the tables that hold the name have no site, such as a credential list or a stealer log. Absent when none.",
    ),
    value: z.string(),
  });
