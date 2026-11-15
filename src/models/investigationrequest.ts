import * as z from "zod";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Runs a new investigation against one retained workspace person.
 */
export type InvestigationRequest = {
  depth: ScreeningDepth;
  platforms: Array<string>;
  person_id: string;
};

export const InvestigationRequest$zodSchema: z.ZodType<InvestigationRequest> = z
  .object({
    depth: ScreeningDepth$zodSchema,
    person_id: z.string(),
    platforms: z.array(z.string()),
  }).describe(
    "Runs a new investigation against one retained workspace person.",
  );
