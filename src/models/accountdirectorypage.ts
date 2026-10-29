import * as z from "zod";
import {
  AccountDirectoryPageItem,
  AccountDirectoryPageItem$zodSchema,
} from "./accountdirectorypageitem.js";

/**
 * Distinct observed accounts with retained assessments. Typed identifier searches use stable opaque account order, independent of newly submitted assessments; ordinary and legacy email searches use newest-seen order. One repeatable-read database snapshot supplies each page's rows and totals. Pages do not share a snapshot: new matching accounts may appear on a later page or before the cursor and be missed until a fresh search; retention, erasure and changed membership can remove results. Current account decisions are read separately and may advance during a page. Cursors bind the workspace/environment, operation and filters, expire, and cannot cross scopes. Erasure and retention always take precedence over pagination.
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
    "Distinct observed accounts with retained assessments. Typed identifier searches use stable opaque account order, independent of newly submitted assessments; ordinary and legacy email searches use newest-seen order. One repeatable-read database snapshot supplies each page's rows and totals. Pages do not share a snapshot: new matching accounts may appear on a later page or before the cursor and be missed until a fresh search; retention, erasure and changed membership can remove results. Current account decisions are read separately and may advance during a page. Cursors bind the workspace/environment, operation and filters, expire, and cannot cross scopes. Erasure and retention always take precedence over pagination.",
  );
