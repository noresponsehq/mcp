import { peopleJudgeRecord } from "../../funcs/peopleJudgeRecord.js";
import { JudgeWorkspacePersonRecordRequest$zodSchema } from "../../models/judgeworkspacepersonrecordop.js";
import { boundToolText, formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: JudgeWorkspacePersonRecordRequest$zodSchema,
};

export const tool$peopleJudgeRecord: ToolDefinition<typeof args> = {
  name: "judge_workspace_person_record",
  description: `Join one of a workspace person's records to them, or reject it.

Records a verdict on one of the records the person report holds: joined makes the record the person's whatever its likelihood, and rejected keeps it a lead that leads nowhere. The verdict belongs to the person on their own: the person report and enrichment follow it. It sticks for as long as the person's evidence holds the same record, and a later verdict on the same record replaces it. After each verdict, enrichment reads the person again under the environment's enrichment setting: it starts no search from a rejected record or from what a search of it found, and a joined record's values lead on. A record the person report does not hold answers 404. Each verdict is audited as person.record_judged. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Join one of a workspace person's records to them, or reject it",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleJudgeRecord(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: boundToolText(result.error.message) }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
