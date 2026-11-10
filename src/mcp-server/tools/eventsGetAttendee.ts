import { eventsGetAttendee } from "../../funcs/eventsGetAttendee.js";
import { GetAttendeeRequest$zodSchema } from "../../models/getattendeeop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAttendeeRequest$zodSchema,
};

export const tool$eventsGetAttendee: ToolDefinition<typeof args> = {
  name: "get_attendee",
  description: `Read an attendee's report.

Read an attendee's report: matched profiles, findings with their evidence, every recorded decision, and the other events where the same email or phone appears.`,
  annotations: {
    "title":
      "Read an attendee's profiles, findings, decisions and other events",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsGetAttendee(
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
