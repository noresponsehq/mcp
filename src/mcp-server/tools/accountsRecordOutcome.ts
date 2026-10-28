import { accountsRecordOutcome } from "../../funcs/accountsRecordOutcome.js";
import { RecordAccountOutcomeRequest$zodSchema } from "../../models/recordaccountoutcomeop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RecordAccountOutcomeRequest$zodSchema,
};

export const tool$accountsRecordOutcome: ToolDefinition<typeof args> = {
  name: "record_account_outcome",
  description: `Record or correct an account outcome

Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.`,
  annotations: {
    "title": "Report or correct an account outcome",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsRecordOutcome(
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
