import * as z from "zod";
import { From, From$zodSchema } from "./from.js";

export type PolicyPreviewTransition = { from: From; to: From; count: number };

export const PolicyPreviewTransition$zodSchema: z.ZodType<
  PolicyPreviewTransition
> = z.object({
  count: z.int(),
  from: From$zodSchema,
  to: From$zodSchema,
});
