import { keysRevoke } from "../../funcs/keysRevoke.js";
import { RevokeKeyRequest$zodSchema } from "../../models/revokekeyop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RevokeKeyRequest$zodSchema,
};

export const tool$keysRevoke: ToolDefinition<typeof args> = {
  name: "revoke_key",
  description: `Revoke an API key.

Revokes a key of the signing key's environment at once: its next request answers 401. Requires the management scope. A key of the other environment or of another workspace answers 404 not_found. A key cannot revoke itself (409 self_revocation): rotate it with keys.rotate, or revoke it with another management key. Revoking a revoked key changes nothing and answers the key as it was revoked, so a retry is safe.`,
  annotations: {
    "title": "Revoke an API key of this environment",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await keysRevoke(
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
