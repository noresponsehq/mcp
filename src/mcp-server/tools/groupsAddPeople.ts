import { groupsAddPeople } from "../../funcs/groupsAddPeople.js";
import { AddPeopleRequest$zodSchema } from "../../models/addpeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AddPeopleRequest$zodSchema,
};

export const tool$groupsAddPeople: ToolDefinition<typeof args> = {
  name: "add_people",
  description: `Add or update a batch of people.

Adds 1 to 500 workspace people to this group, at most 512 KiB. An explicit person_id or external_id reuses the named workspace person. A reference-only row keeps submitted details; an identity supplied with that reference replaces those details. A shared email or phone only suggests matches and does not merge people. Each person's match, band and coverage in the group come from their latest investigation; a changed identity sets aside investigations started before the change, and prior investigation history remains available. Identities are encrypted under the workspace key. Idempotency-Key is required: the same key and body return the original import result with Idempotent-Replayed: true while its people remain retained. An expired or deleted imported person answers 404; expired or deleted match suggestions are omitted. A different body answers 409 idempotency_key_reused. A group holds at most 20000 people. The people_write scope grants this operation; groups is also accepted. Suggested matches require people-read access. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Add or update up to 500 people with an idempotency key",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsAddPeople(
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
