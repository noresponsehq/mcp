<img src="https://raw.githubusercontent.com/noresponsehq/.github/main/profile/sdk-header.png" alt="NoResponse" width="100%">

# NoResponse MCP server

An [MCP](https://modelcontextprotocol.io) server for the NoResponse identity engine. An agent can create a workspace person, start an investigation, and read source records. The server is generated from the same OpenAPI document as the SDKs.

The server uses the API key you give it and stores nothing. Set `NORESPONSE_API_KEY` to a workspace key (`nrk_...`). Node.js 20 or later runs a local install. That key selects the workspace and environment. Give it only the scopes needed: `people` for reads, `people_write` for submitted people, `investigations` for new work, `decisions` for reviews, `exports` for exports and `delete` for deletion. Explicit evidence restrictions still apply. Settings and key administration use `management`. API key creation and rotation stay in your backend.

This server is the customer API only. It does not include signup assessment, operator routes, connectors, ledger, or account mail.

Create a person with `create_workspace_person`, start work with `create_investigation` (the idempotency key is generated when omitted), then read it with `get_investigation`. Keep a stored idempotency key when you repeat a call after an uncertain result: `create_investigation` sends the same generated key on transport retries, and `create_workspace_person` accepts an optional key but does not retry automatically. Reviews also do not retry automatically.

## Tools

| Tool | What it does | API call |
|---|---|---|
| `create_workspace_person` | Create or explicitly reuse a person. Returns possible matches without merging them. Needs `people_write`. | `POST /v1/people` |
| `list_workspace_people` | List people in the key's workspace and environment. Needs `people`. | `GET /v1/people` |
| `get_workspace_person` | Read submitted details, retention expiry and permitted source evidence. Needs `people`. | `GET /v1/people/{person_id}` |
| `delete_workspace_person` | Delete a person and their investigation history. Needs `delete`; marked destructive. | `DELETE /v1/people/{person_id}` |
| `judge_workspace_person_record` | Mark one of a person's records as theirs (`joined`) or someone else's (`rejected`). Enrichment follows it. Needs `decisions` and evidence access. | `POST /v1/people/{person_id}/records` |
| `start_workspace_person_search` | Search a value in a person's collected records, such as one the report's `suggested_searches` names. Needs `investigations` and evidence access. | `POST /v1/people/{person_id}/searches` |
| `create_investigation` | Start work against a person, with a stable request key. Needs `investigations`. | `POST /v1/investigations` |
| `list_investigations` | List retained investigation history. Needs `people`. | `GET /v1/investigations` |
| `get_investigation` | Read a specific job's status, coverage and evidence. Needs `people`. | `GET /v1/investigations/{investigation_id}` |
| `cancel_investigation` | Cancel an unfinished investigation. Needs `investigations`. | `POST /v1/investigations/{investigation_id}/cancel` |
| `create_webhook_endpoint` | Register a webhook endpoint; the answer holds its signing secret, shown once. Needs the `webhooks` scope. | `POST /v1/webhooks` |
| `list_webhook_endpoints` | List your webhook endpoints and their signing key ids. | `GET /v1/webhooks` |
| `send_webhook_test_event` | Send `endpoint.verification`, which verifies the endpoint. | `POST /v1/webhooks/{endpoint_id}/test` |
| `rotate_webhook_signing_key` | Issue a new signing key; the old one verifies for 7 more days. | `POST /v1/webhooks/{endpoint_id}/rotate` |
| `delete_webhook_endpoint` | Delete a webhook endpoint. | `DELETE /v1/webhooks/{endpoint_id}` |
| `list_webhook_deliveries` | Page through an endpoint's delivery attempts, newest first: the event, attempt, status, response code, failure and latency. | `GET /v1/webhooks/{endpoint_id}/deliveries` |
| `replay_webhook_delivery` | Send one logged event to the endpoint again, signed fresh. Not retried. | `POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay` |
| `list_keys` | List the keys of the key's environment, newest first, with no secrets. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/keys` |
| `revoke_key` | Revoke a key of the key's environment at once. A key cannot revoke itself. Needs the `management` scope; marked destructive. | `DELETE /v1/workspaces/{workspace_id}/keys/{key_id}` |
| `get_settings` | Read the environment's retention, admission, refused sources and daily screening cap. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/settings/{environment}` |
| `update_settings` | Change only what the body names, in one transaction. Needs the `management` scope. | `PATCH /v1/workspaces/{workspace_id}/settings/{environment}` |

The table shows the most used tools. [Connect an agent](https://docs.noresponse.org/guides/agents) lists every tool with its required scope.

## Cursor, local stdio

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

## Cursor or any streamable HTTP client

The hosted server is `https://mcp.noresponse.org/mcp`. The same URL is the ChatGPT developer-mode remote MCP address. Send the key on every request; the server passes it to the API and keeps nothing.

```json
{
  "mcpServers": {
    "noresponse": {
      "url": "https://mcp.noresponse.org/mcp",
      "headers": { "Authorization": "Bearer nrk_..." }
    }
  }
}
```

## Claude Desktop

Open `noresponse.mcpb` from the [GitHub release](https://github.com/noresponsehq/mcp/releases), or run the same `npx` command. The key stays on the machine. The latest extension is also at https://mcp.noresponse.org/noresponse.mcpb.

## Licence

Apache-2.0. See [LICENSE](LICENSE).

