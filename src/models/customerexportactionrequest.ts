import * as z from "zod";

/**
 * Send an empty JSON object to cancel or retry a customer export.
 */
export type CustomerExportActionRequest = {};

export const CustomerExportActionRequest$zodSchema: z.ZodType<
  CustomerExportActionRequest
> = z.object({}).describe(
  "Send an empty JSON object to cancel or retry a customer export.",
);
