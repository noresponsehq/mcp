import { peopleCreate } from "../../funcs/peopleCreate.js";
import { CreateWorkspacePersonRequest$zodSchema } from "../../models/createworkspacepersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateWorkspacePersonRequest$zodSchema,
};

export const tool$peopleCreate: ToolDefinition<typeof args> = {
  name: "create_workspace_person",
  description: `Create or reuse a workspace person.

Creates a person without a group. An explicit person_id or external_id reuses the named workspace person. A reference-only request keeps submitted details; identity supplied with that reference replaces those details. A shared email or phone only suggests a match. Suggested matches are returned only with people-read access. The workspace retention setting determines expires_at. An existing person keeps their original expiry. An Idempotency-Key returns the same retained person on retries, without creating another. Changed input with the same key answers 409 idempotency_key_reused. A customer reference that names another person or several people answers 409 person_reference_conflict.`,
  annotations: {
    "title": "Create or reuse a workspace person",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleCreate(
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
