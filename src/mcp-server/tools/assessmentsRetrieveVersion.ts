import { assessmentsRetrieveVersion } from "../../funcs/assessmentsRetrieveVersion.js";
import { GetAssessmentVersionRequest$zodSchema } from "../../models/getassessmentversionop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAssessmentVersionRequest$zodSchema,
};

export const tool$assessmentsRetrieveVersion: ToolDefinition<typeof args> = {
  name: "get_assessment_version",
  description: `Retrieve an exact assessment revision

Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply. detail.identifiers holds the identifiers the assessment was sent, exactly as received.`,
  annotations: {
    "title": "Read an exact assessment revision",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsRetrieveVersion(
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
