import * as z from "zod";
import {
  PolicyHistoryItem,
  PolicyHistoryItem$zodSchema,
} from "./policyhistoryitem.js";

/**
 * Immutable settings snapshots, newest first. history_complete is false when earlier versions predate capture. A restored version is published with a fresh version number. History is removed with the tenant.
 */
export type PolicyHistory = {
  items: Array<PolicyHistoryItem>;
  has_more: boolean;
  next_before_version?: number | undefined;
  history_complete: boolean;
};

export const PolicyHistory$zodSchema: z.ZodType<PolicyHistory> = z.object({
  has_more: z.boolean(),
  history_complete: z.boolean(),
  items: z.array(PolicyHistoryItem$zodSchema),
  next_before_version: z.int().optional(),
}).describe(
  "Immutable settings snapshots, newest first. history_complete is false when earlier versions predate capture. A restored version is published with a fresh version number. History is removed with the tenant.",
);
