import * as z from "zod";
import { LinkedAccount, LinkedAccount$zodSchema } from "./linkedaccount.js";

/**
 * Other accounts in this workspace and environment whose retained assessments submitted an email, phone or customer-namespace username that one of account_id's retained assessments also submitted. Matching uses the identifier search rules: exact, canonical and, for email, mailbox. Only customer-submitted identifiers link accounts; source-discovered identifiers do not. Expired, retention-shortened, deleted and erased assessments link nothing. A shared identifier is not verified ownership. Accounts use stable opaque order, the page and total share one database snapshot, and later pages are live. Cursors bind the workspace, environment, operation and account_id, and expire.
 */
export type LinkedAccountPage = {
  schema_version?: "1" | undefined;
  account_id: string;
  items: Array<LinkedAccount>;
  total: number;
  total_capped: boolean;
  next_cursor?: string | undefined;
};

export const LinkedAccountPage$zodSchema: z.ZodType<LinkedAccountPage> = z
  .object({
    account_id: z.string().describe(
      "The account whose submitted identifiers were compared. It is excluded from items.",
    ),
    items: z.array(LinkedAccount$zodSchema),
    next_cursor: z.string().optional().describe(
      "Opaque, expiring cursor bound to this environment, operation and account_id. Absent on the last page.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
    total: z.int().describe(
      "Distinct linked accounts, exact below 10000 and capped at 10000.",
    ),
    total_capped: z.boolean().describe(
      "True when at least 10000 accounts are linked.",
    ),
  }).describe(
    "Other accounts in this workspace and environment whose retained assessments submitted an email, phone or customer-namespace username that one of account_id's retained assessments also submitted. Matching uses the identifier search rules: exact, canonical and, for email, mailbox. Only customer-submitted identifiers link accounts; source-discovered identifiers do not. Expired, retention-shortened, deleted and erased assessments link nothing. A shared identifier is not verified ownership. Accounts use stable opaque order, the page and total share one database snapshot, and later pages are live. Cursors bind the workspace, environment, operation and account_id, and expire.",
  );
