import { assessmentsSearch } from "../../funcs/assessmentsSearch.js";
import { AssessmentSearchRequest$zodSchema } from "../../models/assessmentsearchrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AssessmentSearchRequest$zodSchema,
};

export const tool$assessmentsSearch: ToolDefinition<typeof args> = {
  name: "search_assessments",
  description: `Search assessments across this environment

Search retained assessments created in [from,to), at most 366 days. identifier directly matches that assessment's submitted email, phone or customer-namespace username using exact, canonical or explicitly selected email mailbox matching. matched_identifier explains the original value and match basis. Legacy email keeps its account-wide mailbox semantics and cannot be combined with identifier. Other filters combine using AND and describe assessment decisions, separate from current account decisions. Each item carries the original submitted identifiers and its first_decision when available. Newest-created order has an assessment-ID tie break. Results are live across pages; each page's total and items use one database snapshot. Totals are exact below 10000 and capped at 10000. Requires history or investigate authority and identifier-read permission for identifier, identifier_expression or email filters; detailed mode also requires detailed permission. No Idempotency-Key. identifier_expression combines submitted terms with bounded AND/OR, at most 8 raw terms and 3 group levels. Each node selects exactly one of term, and, or. Groups have 2 to 8 operands. Duplicate normalized terms are idempotent and still count toward the limit. identifier_expression, identifier and email are mutually exclusive. Expression results use matched_identifiers with original submitted witnesses and zero-based depth-first term_index. All satisfied unique terms are returned in first-occurrence order. Cursors bind scope, ordered structure, original values, matching modes and all other filters; changing only page limit is allowed. Expression scope must be assessment: each returned assessment itself satisfies the complete expression. Scope account is rejected with 400 invalid_request; use account search for historical combinations.`,
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
