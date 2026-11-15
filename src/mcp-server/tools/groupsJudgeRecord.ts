import { groupsJudgeRecord } from "../../funcs/groupsJudgeRecord.js";
import { JudgeRecordRequest$zodSchema } from "../../models/judgerecordop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: JudgeRecordRequest$zodSchema,
};

export const tool$groupsJudgeRecord: ToolDefinition<typeof args> = {
  name: "judge_record",
  description: `Join one of a person's records to them, or reject it.

Records a verdict on one of the records the person's latest lookups found: joined makes the record the person's whatever its likelihood, and rejected keeps it a lead. The verdict sticks for as long as a lookup finds the same record, and a later verdict on the same record replaces it. A record the person's latest lookup does not hold answers 404. Each verdict is audited as person.record_judged. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations.`,
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
