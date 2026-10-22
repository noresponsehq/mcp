export const mcpScopes = [] as const;

export type MCPScope = (typeof mcpScopes)[number];
