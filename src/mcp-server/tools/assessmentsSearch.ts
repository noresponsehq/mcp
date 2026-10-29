import { assessmentsSearch } from "../../funcs/assessmentsSearch.js";
import { AssessmentSearchRequest$zodSchema } from "../../models/assessmentsearchrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AssessmentSearchRequest$zodSchema,
};

export const tool$assessmentsSearch: ToolDefinition<typeof args> = {
  name: "search_assessments",
  description: `Search assessments across this environment

Search retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. Each item's detail.identifiers holds the identifiers its assessment was sent, exactly as received, and first_decision holds the decision of its first answer. email finds every assessment of the accounts that sent a mailbox, matched as lists match it. changed keeps the assessments a later revision changed. total counts every match, exactly up to 10000. This read does not require an idempotency key.`,
  annotations: {
    "title": "Search assessments in this environment",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsSearch(
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
