import { assessmentsRecordOutcome } from "../../funcs/assessmentsRecordOutcome.js";
import { RecordAssessmentOutcomeRequest$zodSchema } from "../../models/recordassessmentoutcomeop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RecordAssessmentOutcomeRequest$zodSchema,
};

export const tool$assessmentsRecordOutcome: ToolDefinition<typeof args> = {
  name: "record_outcome",
  description: `Report what was later learned about an assessed account.

Records what you later learned about an assessed account: confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw your earlier report; unknown is recorded only. Outcomes are append-only and the latest one wins. Requires the assess scope. Idempotency-Key is optional in the SDK and handled as on POST /v1/assessments: a retry with the same key and body answers the same record with Idempotent-Replayed: true; a different body answers 409. An unknown, expired or foreign assessment answers 404 not_found.`,
  annotations: {
    "title": "Record what you learned about an account",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsRecordOutcome(
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
