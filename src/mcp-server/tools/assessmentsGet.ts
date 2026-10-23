import { assessmentsGet } from "../../funcs/assessmentsGet.js";
import { GetAssessmentRequest$zodSchema } from "../../models/getassessmentop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAssessmentRequest$zodSchema,
};

export const tool$assessmentsGet: ToolDefinition<typeof args> = {
  name: "get_assessment",
  description: `Poll the authoritative assessment of one assessment.

Returns the highest assessment_version, with the account's current risk. Requires the assess or history scope. While status is pending, or partial with a source still running, the response carries Retry-After; poll no faster than it says. Another workspace's assessment, an unknown or expired assessment and a malformed assessment_id all answer 404 not_found. response_mode=detailed needs the detailed scope.`,
  annotations: {
    "title": "Get an assessment",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsGet(
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
