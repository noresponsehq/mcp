import { integrationsCreate } from "../../funcs/integrationsCreate.js";
import { IntegrationRequest$zodSchema } from "../../models/integrationrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: IntegrationRequest$zodSchema,
};

export const tool$integrationsCreate: ToolDefinition<typeof args> = {
  name: "create_integration",
  description: `Register a hosted provider integration.

Registers a WorkOS, Auth0 or Supabase integration and returns its hosted endpoint, url, so a sign-up or sign-in is scored with no server of your own. For WorkOS, send the Actions signing secret from the WorkOS dashboard and point the user registration and authentication Actions at url. For Supabase, send the hook secret Supabase generates (v1,whsec_...) and set url as the Before User Created hook's HTTPS endpoint. For Auth0, the answer's secret is the shared secret of the NoResponse Auth0 Action, shown once: store it as an Action secret. hook_points defaults to every hook point the platform has (Supabase has only pre_registration); an event that is not listed is allowed without an assessment. The endpoint waits for the full assessment for at most 2.5 seconds (WorkOS, Supabase) or 4.5 seconds (Auth0), denies only when risk.block is true and allows on any failure. Requires the integrations scope; at most 10 per account. Not idempotent: a retry after a lost answer registers another integration.`,
  annotations: {
    "title": "Register a hosted provider integration",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await integrationsCreate(
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
