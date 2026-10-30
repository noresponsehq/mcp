import { accountsListLinked } from "../../funcs/accountsListLinked.js";
import { ListLinkedAccountsRequest$zodSchema } from "../../models/listlinkedaccountsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListLinkedAccountsRequest$zodSchema,
};

export const tool$accountsListLinked: ToolDefinition<typeof args> = {
  name: "list_linked_accounts",
  description:
    `List accounts that share a submitted identifier with this account.

Lists the other accounts in this environment whose retained assessments submitted an email, phone or customer-namespace username that one of this account's retained assessments also submitted. Matching uses the identifier search rules: exact, canonical and, for email, mailbox. Each linked account names one entry per shared kind, at the strictest basis that links the two accounts, with the original value, assessment_id and submitted_at of each account's newest retained submission of it. Only customer-submitted identifiers link accounts; source-discovered identifiers do not. Expired, deleted and erased assessments link nothing. The account itself is not listed, and an account with no retained submissions answers 200 with empty items. A shared identifier is not verified ownership. Totals are exact below 10000 and capped at 10000. The cursor is opaque, expiring and bound to your workspace, environment and the account; a tampered or expired cursor answers 400 invalid_cursor. Requires the history scope, or investigate with evidence. Read-only and safe to retry.`,
  annotations: {
    "title": "List accounts that share a submitted identifier",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListLinked(
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
