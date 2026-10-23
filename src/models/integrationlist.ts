import * as z from "zod";
import { Integration, Integration$zodSchema } from "./integration.js";

/**
 * GET /v1/integrations: every integration of the workspace, oldest first, at most 10. No secret is ever listed.
 */
export type IntegrationList = { items: Array<Integration> };

export const IntegrationList$zodSchema: z.ZodType<IntegrationList> = z.object({
  items: z.array(Integration$zodSchema),
}).describe(
  "GET /v1/integrations: every integration of the workspace, oldest first, at most 10. No secret is ever listed.",
);
