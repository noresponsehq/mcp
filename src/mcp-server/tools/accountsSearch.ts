import { accountsSearch } from "../../funcs/accountsSearch.js";
import { AccountDirectorySearchRequest$zodSchema } from "../../models/accountdirectorysearchrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AccountDirectorySearchRequest$zodSchema,
};

export const tool$accountsSearch: ToolDefinition<typeof args> = {
  name: "search_accounts",
  description: `Search distinct accounts by email or account ID

Search distinct accounts observed in retained assessments in this environment. Match an exact account_id or canonical email; an email matches any retained assessment belonging to the account. Set needs_action to select accounts with an open or in-progress retained review, or a current review/block decision without an effective retained outcome. This filter applies before pagination and counting, adds waiting_for reasons to each row and requires management scope as well as history or investigate access. The response contains one row per account with its newest retained assessment, current decision when available, per-account assessment count, and total distinct-account count. Send next_cursor with unchanged filters to continue. Totals are exact below 10000 and capped at 10000. Results are live across pages. Requires history access and identifier access for email. Read-only and safe to retry.`,
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
