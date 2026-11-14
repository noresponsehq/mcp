import { groupsJudgeRecord } from "../../funcs/groupsJudgeRecord.js";
import { JudgeRecordRequest$zodSchema } from "../../models/judgerecordop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: JudgeRecordRequest$zodSchema,
};

export const tool$groupsJudgeRecord: ToolDefinition<typeof args> = {
  name: "judge_record",
  description: `Join one of a person's records to them, or reject it.

Join one of a person's lookup records to them whatever its likelihood, or reject it so it stays a lead. The verdict sticks while lookups find the same record.`,
  annotations: {
    "title": "Join one of a person's records to them, or reject it",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsJudgeRecord(
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
