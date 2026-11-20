import { peopleSchedule } from "../../funcs/peopleSchedule.js";
import { ScheduleWorkspacePersonRequest$zodSchema } from "../../models/scheduleworkspacepersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ScheduleWorkspacePersonRequest$zodSchema,
};

export const tool$peopleSchedule: ToolDefinition<typeof args> = {
  name: "schedule_workspace_person",
  description: `Schedule a workspace person's reruns.

Sets how often the person is investigated again: daily, weekly or monthly, counted from now, or off. Each due run starts one full investigation of the person, which the person's investigations list and whose changes the person report stores. Setting the period the schedule already has keeps its next run. The schedule lives in the database and the worker runs it, so a restart or a release neither skips nor repeats a run. Each change is audited as person.schedule_changed. The investigations scope grants this operation. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Schedule a workspace person's reruns",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleSchedule(
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
