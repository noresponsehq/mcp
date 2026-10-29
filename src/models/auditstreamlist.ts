import * as z from "zod";
import { AuditStream, AuditStream$zodSchema } from "./auditstream.js";

/**
 * Read audit stream subscriptions.
 */
export type AuditStreamList = { items: Array<AuditStream> };

export const AuditStreamList$zodSchema: z.ZodType<AuditStreamList> = z.object({
  items: z.array(AuditStream$zodSchema),
}).describe("Read audit stream subscriptions.");
