import * as z from "zod";
import {
  ListChangeState,
  ListChangeState$zodSchema,
} from "./listchangestate.js";
import { ListEntry, ListEntry$zodSchema } from "./listentry.js";

/**
 * A committed bulk list change and bounded notification progress, available while propagation is pending and for 24 hours after all propagation completes. References count an account once per changed list entry and are not unique accounts. No endpoint delivery or customer enforcement is implied by completed.
 */
export type ListChange = {
  id: string;
  created_at: string;
  state: ListChangeState;
  added: Array<ListEntry>;
  removed: Array<string>;
  pending_propagations: number;
  processed_account_references: number;
};

export const ListChange$zodSchema: z.ZodType<ListChange> = z.object({
  added: z.array(ListEntry$zodSchema),
  created_at: z.string(),
  id: z.string(),
  pending_propagations: z.int(),
  processed_account_references: z.int(),
  removed: z.array(z.string()),
  state: ListChangeState$zodSchema,
}).describe(
  "A committed bulk list change and bounded notification progress, available while propagation is pending and for 24 hours after all propagation completes. References count an account once per changed list entry and are not unique accounts. No endpoint delivery or customer enforcement is implied by completed.",
);
