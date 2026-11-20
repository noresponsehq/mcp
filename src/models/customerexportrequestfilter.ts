import * as z from "zod";
import { Environment, Environment$zodSchema } from "./environment.js";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

export type CustomerExportRequestFilter = {
  action?: string | undefined;
  actor?: string | undefined;
  target_type?: string | undefined;
  target_id?: string | undefined;
  environment?: Environment | undefined;
  outcome?: Outcome | undefined;
  since?: string | undefined;
  until?: string | undefined;
};

export const CustomerExportRequestFilter$zodSchema: z.ZodType<
  CustomerExportRequestFilter
> = z.object({
  action: z.string().optional(),
  actor: z.string().optional(),
  environment: Environment$zodSchema.optional(),
  outcome: Outcome$zodSchema.optional(),
  since: z.string().optional(),
  target_id: z.string().optional(),
  target_type: z.string().optional(),
  until: z.string().optional(),
});
