import { accountsSearch } from "../../funcs/accountsSearch.js";
import { AccountDirectorySearchRequest$zodSchema } from "../../models/accountdirectorysearchrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AccountDirectorySearchRequest$zodSchema,
};

export const tool$accountsSearch: ToolDefinition<typeof args> = {
  name: "search_accounts",
  description: `Search distinct accounts by submitted identifier or account ID

Search distinct accounts observed in retained assessments in this environment. identifier matches an exact, canonical or explicitly selected mailbox form of a submitted email, phone or customer-namespace username. It matches historical retained inputs and returns matched_identifier with the original value and matching assessment. Each row has its newest retained assessment, current account decision when available, retained assessment count, and total distinct-account count. identifier and legacy email are mutually exclusive; account_id and needs_action combine with either using AND. Set needs_action to select accounts with a retained open or in-progress review, or a current review/block account decision without an effective retained account outcome. This filter applies before counting and pagination and adds waiting_for reasons. Current decisions include account list overrides and shared-key scoring and preserve admission holds. Typed identifier search uses stable opaque account order; ordinary and legacy email searches retain newest-seen order. Results are live across pages; each page's items and total share a database snapshot, while current account risk is read separately. Cursors are expiring and bound to scope, operation and filters. Totals are exact below 10000 and capped at 10000. Requires history or investigate authority and identifier-read permission for identifier or email filtering. needs_action additionally requires management scope. Source-discovered associations are not searched and equality is not verified ownership.`,
  annotations: {
    "title": "Search retained accounts by identifier",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsSearch(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
