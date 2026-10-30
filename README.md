<img src="https://raw.githubusercontent.com/noresponsehq/.github/main/profile/sdk-header.png" alt="NoResponse" width="100%">

# NoResponse MCP server

An [MCP](https://modelcontextprotocol.io) server for the NoResponse API, so an agent can assess an account creation, login or purchase, wait for a pending assessment, page through an account's history and record what you later learned. It is generated from the same OpenAPI document as the NoResponse SDKs.

The server uses the API key you give it and stores nothing. API key rotation and key creation are not tools: rotate and create keys from your own backend. The integration tools need a key with the `integrations` scope, and the key, settings and list tools a key with the `management` scope; give the server a key without them to keep them unusable.

## Tools

| Tool | What it does | API call |
|---|---|---|
| `create_assessment` | Assess identifiers (email, phone, username, name, IP) for an `account_creation`, `login` or `purchase` flow. Sends a fresh Idempotency-Key when you give none. | `POST /v1/assessments` |
| `get_assessment` | Read the latest version of one assessment. | `GET /v1/assessments/{assessment_id}` |
| `wait_for_assessment` | Poll a pending assessment, at the interval Retry-After asks for, until it settles or `timeout_seconds` (default 25, at most 55) pass. | `GET /v1/assessments/{assessment_id}` |
| `query_assessments` | Page through one account's unexpired assessments, newest first. | `POST /v1/assessments/query` |
| `get_account` | Read an account's one current risk: the score, a decision (`allow`, `step_up`, `review`, `block`, or `held` while a held flow waits) for each flow, and the assessment it comes from. Needs the `history` scope. | `GET /v1/accounts/{account_id}` |
| `list_account_assessments` | Page through one account's unexpired assessments, newest first, with the account id in the URL. Needs the `history` scope. | `GET /v1/accounts/{account_id}/assessments` |
| `list_changed_accounts` | List the accounts whose risk changed, oldest change first; pass `next_cursor` back as `changed_since` to poll, and `unenforced` true for only the accounts that need action. Needs the `history` scope. | `GET /v1/accounts` |
| `record_enforcement` | Record what you did to an account in your identity provider for one flow at one `risk_version`, applied or failed. A repeat answers the stored record. Needs the `history` scope. | `POST /v1/accounts/{account_id}/enforcements` |
| `delete_assessment` | Delete one assessment in the key's environment, with its evidence and outcomes, and score its account again. The answer names the assessment the account's risk now comes from. A repeat answers 404. Needs the `delete` scope; marked destructive. | `DELETE /v1/assessments/{assessment_id}` |
| `delete_account` | Erase an account in the key's environment: every assessment of it, with its evidence and outcomes. A repeat answers `assessments_deleted` 0, and an `account.deleted` webhook follows when something was deleted. Needs the `delete` scope; marked destructive. | `DELETE /v1/accounts/{account_id}` |
| `record_outcome` | Report what you later learned about an assessed account (`confirmed_abuse`, `legitimate` and so on). | `POST /v1/assessments/{assessment_id}/outcomes` |
| `create_webhook_endpoint` | Register a webhook endpoint; the answer holds its signing secret, shown once. Needs the `webhooks` scope. | `POST /v1/webhooks` |
| `list_webhook_endpoints` | List your webhook endpoints and their signing key ids. | `GET /v1/webhooks` |
| `send_webhook_test_event` | Send `endpoint.verification` (verifies the endpoint) or a test `assessment.updated`. | `POST /v1/webhooks/{endpoint_id}/test` |
| `rotate_webhook_signing_key` | Issue a new signing key; the old one verifies for 7 more days. | `POST /v1/webhooks/{endpoint_id}/rotate` |
| `delete_webhook_endpoint` | Delete a webhook endpoint. | `DELETE /v1/webhooks/{endpoint_id}` |
| `list_webhook_deliveries` | Page through an endpoint's delivery attempts, newest first: the event, attempt, status, response code, failure and latency. | `GET /v1/webhooks/{endpoint_id}/deliveries` |
| `replay_webhook_delivery` | Send one logged event to the endpoint again, signed fresh. Not retried. | `POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay` |
| `create_integration` | Register a hosted WorkOS or Auth0 integration and return its endpoint URL. For Auth0 the answer holds the Action's shared secret, shown once. Never retried. | `POST /v1/integrations` |
| `list_integrations` | List the account's integrations, oldest first, with no secrets. | `GET /v1/integrations` |
| `delete_integration` | Delete an integration; its endpoint answers 404 from then on. | `DELETE /v1/integrations/{integration_id}` |
| `rotate_integration_secret` | Replace an integration's secret. The old one is accepted for 24 hours. Never retried. | `POST /v1/integrations/{integration_id}/rotate` |
| `list_keys` | List the keys of the key's environment, newest first, with no secrets. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/keys` |
| `revoke_key` | Revoke a key of the key's environment at once. A key cannot revoke itself. Needs the `management` scope; marked destructive. | `DELETE /v1/workspaces/{workspace_id}/keys/{key_id}` |
| `get_settings` | Read the environment's retention, flow thresholds, admission and refused sources. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/settings/{environment}` |
| `update_settings` | Change only what the body names, in one transaction. Needs the `management` scope. | `PATCH /v1/workspaces/{workspace_id}/settings/{environment}` |
| `list_list_entries` | List the environment's allow and block list, oldest first. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/lists/{environment}` |
| `create_list_entry` | Add an email or email domain to the block or allow list; the accounts it matches are decided again. Needs the `management` scope. | `POST /v1/workspaces/{workspace_id}/lists/{environment}` |
| `delete_list_entry` | Delete an entry; the accounts it matched go back to their scored decision. Needs the `management` scope. | `DELETE /v1/workspaces/{workspace_id}/lists/{environment}/{list_entry_id}` |

Act on `account.risk.decision` (`allow`, `step_up`, `review`, `block`, or `held` while a held flow waits for its investigation), the account's current decision for the assessment's flow. `detail` holds the assessment's own risk, recommendation and `assessment_version`. While the account's first assessment is pending, `account` is absent, so apply your own fallback for that, 429, 503 or a timeout.

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


## Combine submitted identifiers

Search accounts and assessments with explicit AND/OR combinations of submitted
email, phone and customer-namespace username terms. Use `IdentifierExpression`
and its required `scope`: `assessment` requires one submission to satisfy the
whole expression; `account` can combine different retained submissions of the
same account and is accepted only by account search. Pass the wire shape under `request.identifier_expression` to `search_accounts` or `search_assessments`.

Expressions have at most eight raw terms and three group levels. The original
exact, canonical and explicit mailbox matching rules still apply to each term.
Expression results contain indexed `IdentifierTermMatch` records with the
original submitted value and originating assessment, separate from current
account risk. Single-identifier and legacy email filters retain their behavior.

See the [combined-search contract and examples](https://docs.noresponse.org/reference/investigation#combine-submitted-identifiers)
for the expression shape, scope differences, permissions and pagination.
