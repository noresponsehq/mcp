# NoResponse MCP server

An [MCP](https://modelcontextprotocol.io) server for the NoResponse API, so an agent can assess a signup or gateway event, wait for a pending assessment, page through an account's history and record what you later learned. It is generated from the same OpenAPI document as the NoResponse SDKs.

The server uses the API key you give it and stores nothing. API key rotation is not a tool: rotate keys from your own backend. The integration tools need a key with the `integrations` scope; give the server a key without it to keep them unusable.

## Tools

| Tool | What it does | API call |
|---|---|---|
| `create_assessment` | Assess identifiers (email, phone, username, name, IP) for a signup or gateway decision. Sends a fresh Idempotency-Key when you give none. | `POST /v1/assessments` |
| `get_assessment` | Read the latest version of one assessment. | `GET /v1/assessments/{assessment_id}` |
| `wait_for_assessment` | Poll a pending assessment, at the interval Retry-After asks for, until it settles or `timeout_seconds` (default 25, at most 55) pass. | `GET /v1/assessments/{assessment_id}` |
| `query_assessments` | Page through one account's unexpired assessments, newest first. | `POST /v1/assessments/query` |
| `record_outcome` | Report what you later learned about an assessed account (`confirmed_abuse`, `legitimate` and so on). | `POST /v1/assessments/{assessment_id}/outcomes` |
| `create_webhook_endpoint` | Register a webhook endpoint; the answer holds its signing secret, shown once. Needs the `webhooks` scope. | `POST /v1/webhooks` |
| `list_webhook_endpoints` | List your webhook endpoints and their signing key ids. | `GET /v1/webhooks` |
| `send_webhook_test_event` | Send `endpoint.verification` (verifies the endpoint) or a test `assessment.updated`. | `POST /v1/webhooks/{endpoint_id}/test` |
| `rotate_webhook_signing_key` | Issue a new signing key; the old one verifies for 7 more days. | `POST /v1/webhooks/{endpoint_id}/rotate` |
| `delete_webhook_endpoint` | Delete a webhook endpoint. | `DELETE /v1/webhooks/{endpoint_id}` |
| `create_integration` | Register a hosted WorkOS or Auth0 integration and return its endpoint URL. For Auth0 the answer holds the Action's shared secret, shown once. Never retried. | `POST /v1/integrations` |
| `list_integrations` | List the account's integrations, oldest first, with no secrets. | `GET /v1/integrations` |
| `delete_integration` | Delete an integration; its endpoint answers 404 from then on. | `DELETE /v1/integrations/{integration_id}` |
| `rotate_integration_secret` | Replace an integration's secret. The old one is accepted for 24 hours. Never retried. | `POST /v1/integrations/{integration_id}/rotate` |

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
