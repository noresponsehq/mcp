import * as z from "zod";
import { Action, Action$zodSchema } from "./action.js";
import { ListImpactKind, ListImpactKind$zodSchema } from "./listimpactkind.js";
import {
  ListImpactTransition,
  ListImpactTransition$zodSchema,
} from "./listimpacttransition.js";

/**
 * List override changes among the newest 5000 matching accounts. These counts describe override inputs. Customer enforcement and eventual outcomes remain separate. The response reports whether the matching population was truncated.
 */
export type ListImpact = {
  scope?: "current_list_override_inputs" | undefined;
  kind: ListImpactKind;
  value: string;
  action: Action;
  remove?: string | undefined;
  matched_accounts: number;
  changed_overrides: number;
  truncated: boolean;
  historical_population_known?: false | undefined;
  transitions: Array<ListImpactTransition>;
};

export const ListImpact$zodSchema: z.ZodType<ListImpact> = z.object({
  action: Action$zodSchema,
  changed_overrides: z.int(),
  historical_population_known: z.literal(false).default(false).optional(),
  kind: ListImpactKind$zodSchema,
  matched_accounts: z.int(),
  remove: z.string().optional(),
  scope: z.literal("current_list_override_inputs").default(
    "current_list_override_inputs",
  ).optional(),
  transitions: z.array(ListImpactTransition$zodSchema),
  truncated: z.boolean(),
  value: z.string(),
}).describe(
  "List override changes among the newest 5000 matching accounts. These counts describe override inputs. Customer enforcement and eventual outcomes remain separate. The response reports whether the matching population was truncated.",
);
