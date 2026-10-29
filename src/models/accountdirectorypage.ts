import * as z from "zod";
import {
  AccountDirectoryPageItem,
  AccountDirectoryPageItem$zodSchema,
} from "./accountdirectorypageitem.js";

/**
 * Accounts observed in retained assessments, newest seen first, with each account once per page and across pages. Counts and keyset pagination are computed over distinct accounts in one database snapshot per page. Live data can change between pages.
 */
export type AccountDirectoryPage = {
  schema_version?: "1" | undefined;
  items: Array<AccountDirectoryPageItem>;
  total: number;
  total_capped: boolean;
  next_cursor?: string | undefined;
};

export const AccountDirectoryPage$zodSchema: z.ZodType<AccountDirectoryPage> = z
  .object({
    items: z.array(AccountDirectoryPageItem$zodSchema),
    next_cursor: z.string().optional().describe(
      "Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
    total: z.int().describe(
      "Distinct accounts matching the filters, exact below 10000 and capped at 10000.",
    ),
    total_capped: z.boolean().describe(
      "True when at least 10000 accounts match.",
    ),
  }).describe(
    "Accounts observed in retained assessments, newest seen first, with each account once per page and across pages. Counts and keyset pagination are computed over distinct accounts in one database snapshot per page. Live data can change between pages.",
  );
