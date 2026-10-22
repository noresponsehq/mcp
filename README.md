# NoResponse MCP server

An [MCP](https://modelcontextprotocol.io) server for the NoResponse API, so an agent can assess a signup or gateway event, wait for a pending assessment, page through an account's history and record what you later learned. It is generated from the same OpenAPI document as the NoResponse SDKs.

The server uses the API key you give it and stores nothing. Key rotation is not a tool: rotate keys from your own backend.

## Tools

| Tool | What it does | API call |
|---|---|---|
| `create_assessment` | Assess identifiers (email, phone, username, name, IP) for a signup or gateway decision. Sends a fresh Idempotency-Key when you give none. | `POST /v1/assessments` |
| `get_assessment` | Read the latest version of one assessment. | `GET /v1/assessments/{assessment_id}` |
| `wait_for_assessment` | Poll a pending assessment, at the interval Retry-After asks for, until it settles or `timeout_seconds` (default 25, at most 55) pass. | `GET /v1/assessments/{assessment_id}` |
| `query_assessments` | Page through one account's unexpired assessments, newest first. | `POST /v1/assessments/query` |
| `record_outcome` | Report what you later learned about an assessed account (`confirmed_abuse`, `legitimate` and so on). | `POST /v1/assessments/{assessment_id}/outcomes` |

Recommendations are advisory. A pending assessment has no recommendation, so apply your own fallback for pending, 429, 503 or a timeout.

## Hosted server

`https://mcp.noresponse.org/mcp` serves the same tools over Streamable HTTP. Send your key as `Authorization: Bearer <key>` on every request; the server passes it to the API and keeps nothing.

```json
{
  "mcpServers": {
    "noresponse": {
      "type": "http",
      "url": "https://mcp.noresponse.org/mcp",
      "headers": { "Authorization": "Bearer ${NORESPONSE_API_KEY}" }
    }
  }
}
```

## Local server

Node.js 20 or later runs the server over stdio. It reads the key from `NORESPONSE_API_KEY`.

```sh
NORESPONSE_API_KEY=nrk_... npx -y @noresponse/mcp start
```

```json
{
  "mcpServers": {
    "noresponse": {
      "command": "npx",
      "args": ["-y", "@noresponse/mcp", "start"],
      "env": { "NORESPONSE_API_KEY": "nrk_..." }
    }
  }
}
```

`start --server-url <url>` points it at another API base URL, and `start --tool <name>` mounts only the tools you name.

## Claude Desktop

Each [release](https://github.com/noresponsehq/mcp/releases) attaches `noresponse.mcpb`, a desktop extension, and the latest one is also at https://mcp.noresponse.org/noresponse.mcpb. Open it with Claude Desktop and paste your API key when asked; the key stays on your computer.

## Licence

Apache-2.0. See [LICENSE](LICENSE).
