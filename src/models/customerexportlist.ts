import * as z from "zod";
import { CustomerExport, CustomerExport$zodSchema } from "./customerexport.js";

/**
 * List exports for one collection.
 */
export type CustomerExportList = {
  items: Array<CustomerExport>;
  next_cursor?: string | undefined;
};

export const CustomerExportList$zodSchema: z.ZodType<CustomerExportList> = z
  .object({
    items: z.array(CustomerExport$zodSchema),
    next_cursor: z.string().optional(),
  }).describe("List exports for one collection.");
