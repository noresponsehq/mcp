import * as z from "zod";
import { AccountDeleted, AccountDeleted$zodSchema } from "./accountdeleted.js";

/**
 * The account.deleted event.
 */
export type AccountDeletedEvent = {
  id: string;
  created_at: string;
  type?: "account.deleted" | undefined;
  test?: boolean | undefined;
  data: AccountDeleted;
};

export const AccountDeletedEvent$zodSchema: z.ZodType<AccountDeletedEvent> = z
  .object({
    created_at: z.string().describe(
      "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
    ),
    data: AccountDeleted$zodSchema.describe(
      "Terminal for the account's assessments created at or before deleted_at in the receiving endpoint's environment: delete what you hold from them and ignore later-arriving updates of them. deleted_at is no earlier than the creation of any assessment it erased. An assessment created after it belongs to the account assessed again: keep it, even when this event arrives after it.",
    ),
    id: z.string().describe(
      "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
    ),
    test: z.boolean().optional().describe(
      "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
    ),
    type: z.literal("account.deleted").default("account.deleted").optional()
      .describe("Always account.deleted."),
  }).describe("The account.deleted event.");
