import * as z from "zod";
import {
  ListEntryRequest,
  ListEntryRequest$zodSchema,
} from "./listentryrequest.js";

/**
 * At most 100 additions and removals combined. One transaction applies all changes or none. Idempotency-Key prevents duplicate changes for 24 hours; a different body under the same key returns 409. Matching reads see the new list immediately, while bounded durable jobs propagate account risk notifications.
 */
export type ListBulkRequest = {
  add?: Array<ListEntryRequest> | undefined;
  remove?: Array<string> | undefined;
};

export const ListBulkRequest$zodSchema: z.ZodType<ListBulkRequest> = z.object({
  add: z.array(ListEntryRequest$zodSchema).optional(),
  remove: z.array(z.string()).optional(),
}).describe(
  "At most 100 additions and removals combined. One transaction applies all changes or none. Idempotency-Key prevents duplicate changes for 24 hours; a different body under the same key returns 409. Matching reads see the new list immediately, while bounded durable jobs propagate account risk notifications.",
);
