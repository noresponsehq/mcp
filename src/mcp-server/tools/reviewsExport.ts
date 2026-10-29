import { reviewsExport } from "../../funcs/reviewsExport.js";
import { ExportReviewRequest$zodSchema } from "../../models/exportreviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ExportReviewRequest$zodSchema,
};

export const tool$reviewsExport: ToolDefinition<typeof args> = {
  name: "export_review",
  description: `Export an account review

Export retained review details, comments, resolutions and linked subjects. Requires current reviews.read and exports.read; API keys need management together with exports, history or audit_manage. The audit event commits before any bytes are returned. Oversized exports are refused without truncation; use the bounded collection APIs.`,
  annotations: {
    "title":
      "Read a bounded investigation export including comments and resolutions",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsExport(
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
