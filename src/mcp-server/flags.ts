import { SDKOptions } from "../lib/config.js";

/**
 * Base flags interface for MCP server configuration.
 * Used by both CLI start command and Gram deployment wrapper.
 */
export interface MCPServerFlags {
  readonly tool?: string[];
  readonly mode?: "dynamic" | undefined;
  readonly "tool-annotations"?: string[] | undefined;
  readonly "api-key"?: string | undefined;
  readonly "server-url"?: string | undefined;
  readonly "server-index"?: SDKOptions["serverIdx"];
}
