import { groupsExportPeople } from "../../funcs/groupsExportPeople.js";
import { ExportPeopleRequest$zodSchema } from "../../models/exportpeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ExportPeopleRequest$zodSchema,
};

export const tool$groupsExportPeople: ToolDefinition<typeof args> = {
  name: "export_people",
  description: `Export the people in a group.

Returns one page for export. Each returned person is durably audited as person.exported with the actor, group, person ID and request ID. Requires both people read access and exports. Explicit evidence restrictions also hide free-text decision notes. No raw evidence enters audit logs. Follow next_after until absent for a complete export. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Export a group roster with access audits",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsExportPeople(
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
