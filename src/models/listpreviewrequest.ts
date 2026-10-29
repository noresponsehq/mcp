import * as z from "zod";
import {
  ListEntryRequest,
  ListEntryRequest$zodSchema,
} from "./listentryrequest.js";

/**
 * Choose an addition or a removal. The preview performs no list, account, audit, outcome or outbox write.
 */
export type ListPreviewRequest = {
  add?: ListEntryRequest | undefined;
  remove?: string | undefined;
};

export const ListPreviewRequest$zodSchema: z.ZodType<ListPreviewRequest> = z
  .object({
    add: ListEntryRequest$zodSchema.optional().describe(
      "POST /v1/workspaces/{workspace_id}/lists/{environment} body. Adds one entry to the environment's list and, in the same change, re-decides every account it matches: each sends account.risk_changed when a decision changes. Needs the admin or owner role, or a management key of the environment.",
    ),
    remove: z.string().optional(),
  }).describe(
    "Choose an addition or a removal. The preview performs no list, account, audit, outcome or outbox write.",
  );
