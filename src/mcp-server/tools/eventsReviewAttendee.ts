import { eventsReviewAttendee } from "../../funcs/eventsReviewAttendee.js";
import { ReviewAttendeeRequest$zodSchema } from "../../models/reviewattendeeop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReviewAttendeeRequest$zodSchema,
};

export const tool$eventsReviewAttendee: ToolDefinition<typeof args> = {
  name: "review_attendee",
  description: `Record a decision on an attendee.

Record a cleared, watch or escalated decision with a note. The latest decision is the attendee's; the next screening refreshes everyone on watch or escalated.`,
  annotations: {
    "title": "Mark an attendee cleared, watch or escalated with a note",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsReviewAttendee(
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
