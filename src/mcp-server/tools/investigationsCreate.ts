import { investigationsCreate } from "../../funcs/investigationsCreate.js";
import { CreateInvestigationRequest$zodSchema } from "../../models/createinvestigationop.js";
import { boundToolText, formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateInvestigationRequest$zodSchema,
};

export const tool$investigationsCreate: ToolDefinition<typeof args> = {
  name: "create_investigation",
  description: `Start an investigation for a person.

Starts an investigation against a retained workspace person. enrichment overrides, field by field, how the environment's enrichment setting runs after this investigation; the person's latest investigation decides the enrichment that runs on them. Idempotency-Key is required: the same key and input return the same retained job in its current state without repeating billable work. Different input with that key answers 409 idempotency_key_reused; a deliberate new investigation uses a new key. The response includes Location and Retry-After. The person's retention expiry limits both execution and retained history. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Investigate a workspace person with a stable request key",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await investigationsCreate(
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
