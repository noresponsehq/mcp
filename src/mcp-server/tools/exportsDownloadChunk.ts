import { exportsDownloadChunk } from "../../funcs/exportsDownloadChunk.js";
import { DownloadCustomerExportChunkRequest$zodSchema } from "../../models/downloadcustomerexportchunkop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DownloadCustomerExportChunkRequest$zodSchema,
};

export const tool$exportsDownloadChunk: ToolDefinition<typeof args> = {
  name: "download_export_chunk",
  description: `Download one authorized export chunk.

Download one chunk of a completed, unexpired export after a fresh permission and privacy check. The response contains base64-encoded JSON Lines, a SHA-256, generation and next index. Decode and concatenate chunks in order from one generation. Audit storage failure withholds the bytes.`,
  annotations: {
    "title": "Read one authorized chunk from a completed unexpired export",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsDownloadChunk(
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
