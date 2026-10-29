import * as z from "zod";
import { Cost, Cost$zodSchema } from "./cost.js";

export type PolicyEvaluationRequestCosts = { legitimate: Cost; abuse: Cost };

export const PolicyEvaluationRequestCosts$zodSchema: z.ZodType<
  PolicyEvaluationRequestCosts
> = z.object({
  abuse: Cost$zodSchema,
  legitimate: Cost$zodSchema,
});
