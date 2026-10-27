import * as z from "zod";
import {
  ListEntryAction,
  ListEntryAction$zodSchema,
} from "./listentryaction.js";
import { ListEntryKind, ListEntryKind$zodSchema } from "./listentrykind.js";

/**
 * POST /v1/workspaces/{workspace_id}/lists/{environment} body. Adds one entry to the environment's list and, in the same change, re-decides every account it matches: each sends account.risk_changed when a decision changes. Needs the admin or owner role, or a management key of the environment.
 */
export type ListEntryRequest = {
  kind: ListEntryKind;
  value: string;
  action: ListEntryAction;
  note?: string | undefined;
};

export const ListEntryRequest$zodSchema: z.ZodType<ListEntryRequest> = z.object(
  {
    action: ListEntryAction$zodSchema.describe(
      "block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.",
    ),
    kind: ListEntryKind$zodSchema.describe(
      "email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.",
    ),
    note: z.string().optional().describe(
      "Why the entry exists, for the people who manage the list. It is shown with the entry and decides nothing.",
    ),
    value: z.string().describe(
      "An email address for kind email, written as in an assessment request; an LDH domain (A-label for an internationalised one) such as example.com for kind email_domain, which must sit below a public suffix (co.uk alone is refused with 400). NoResponse stores it in canonical form and answers that form.",
    ),
  },
).describe(
  "POST /v1/workspaces/{workspace_id}/lists/{environment} body. Adds one entry to the environment's list and, in the same change, re-decides every account it matches: each sends account.risk_changed when a decision changes. Needs the admin or owner role, or a management key of the environment.",
);
