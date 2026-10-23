import { assessmentsDelete } from "../../funcs/assessmentsDelete.js";
import { DeleteAssessmentRequest$zodSchema } from "../../models/deleteassessmentop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteAssessmentRequest$zodSchema,
};

export const tool$assessmentsDelete: ToolDefinition<typeof args> = {
  name: "delete_assessment",
  description: `Delete one assessment.

Deletes one assessment in the environment of your key, with its versions, evidence and outcomes and the identity-graph marks its outcomes set, and scores its account again from what remains. Afterwards the assessment answers 404 and leaves the account's history. The answer names the account and the assessment its current risk now comes from; current_assessment_id is absent when the account has no assessment with a decision left. Requires the history scope. An unknown, expired or already deleted assessment answers 404, so a repeat answers 404; to erase a whole account idempotently, use accounts.delete.`,
  annotations: {
    "title": "Delete one assessment",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsDelete(
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
