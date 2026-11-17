<img src="https://raw.githubusercontent.com/noresponsehq/.github/main/profile/sdk-header.png" alt="NoResponse" width="100%">

# NoResponse MCP server

An [MCP](https://modelcontextprotocol.io) server for the NoResponse identity engine. An agent can create a workspace person, start an investigation, read source records and review a result. Groups organize people for shared screening. Signup assessment uses the same engine. The server is generated from the same OpenAPI document as the SDKs.

The server uses the API key you give it and stores nothing. That key selects the workspace and environment. Give it only the scopes needed: `people` for reads, `people_write` for submitted people and group changes, `investigations` for new work, `decisions` for reviews, `exports` for exports and `delete` for deletion. Explicit evidence restrictions still apply. Integration tools use `integrations`, and settings, lists and key administration use `management`. API key creation and rotation stay in your backend.

Keep a stored idempotency key for each deliberate investigation. `create_investigation` generates one when omitted and keeps it unchanged during transport retries; supply the same key yourself when repeating a tool call after an uncertain result. `create_workspace_person` accepts an optional key but does not retry automatically. Reviews also do not retry automatically.

## Tools

| Tool | What it does | API call |
|---|---|---|
| `create_workspace_person` | Create or explicitly reuse a person without a group. Returns possible matches without merging them. Needs `people_write`. | `POST /v1/people` |
| `list_workspace_people` | List people in the key's workspace and environment. Needs `people`. | `GET /v1/people` |
| `get_workspace_person` | Read submitted details, retention expiry and permitted source evidence. Needs `people`. | `GET /v1/people/{person_id}` |
| `delete_workspace_person` | Delete a person and their investigation history. Needs `delete`; marked destructive. | `DELETE /v1/people/{person_id}` |
| `judge_workspace_person_record` | Mark one of a person's records as theirs (`joined`) or someone else's (`rejected`). Enrichment follows it. Needs `decisions` and evidence access. | `POST /v1/people/{person_id}/records` |
| `start_workspace_person_search` | Search a value in a person's collected records, outside any group, such as one the report's `suggested_searches` names. Needs `investigations` and evidence access. | `POST /v1/people/{person_id}/searches` |
| `create_investigation` | Start work against a person, with an optional group review context. Needs `investigations`. | `POST /v1/investigations` |
| `list_investigations` | List retained investigation history. Needs `people`. | `GET /v1/investigations` |
| `get_investigation` | Read a specific job's status, coverage, evidence and review history. Needs `people`. | `GET /v1/investigations/{investigation_id}` |
| `review_investigation` | Record a decision within this investigation. Needs `decisions`. | `POST /v1/investigations/{investigation_id}/reviews` |
| `cancel_investigation` | Cancel an unfinished investigation. Needs `investigations`. | `POST /v1/investigations/{investigation_id}/cancel` |
| `create_group` | Create a group for people to screen together. Needs `people_write`. | `POST /v1/groups` |
| `add_people` | Add or explicitly reuse up to 500 people. Needs `people_write`. | `POST /v1/groups/{group_id}/people` |
| `remove_group_person` | Remove membership and its review context, preserving the person and investigations. Needs `delete`. | `DELETE /v1/groups/{group_id}/people/{person_id}` |
| `delete_group` | Delete a group and its review context, preserving people and completed investigations. Needs `delete`. | `DELETE /v1/groups/{group_id}` |
| `start_screening` | Run lookups and analysis for a group's people. Needs `investigations`. | `POST /v1/groups/{group_id}/screenings` |
| `get_screening` | Read a screening's status and progress. Needs `people`. | `GET /v1/groups/{group_id}/screenings/{screening_id}` |
| `get_person` | Read a person within a group's review context. Needs `people`. | `GET /v1/groups/{group_id}/people/{person_id}` |
| `start_search` | Search a value in the person's collected records. Needs `investigations` and evidence access. | `POST /v1/groups/{group_id}/people/{person_id}/searches` |
| `review_person` | Record the group's decision: `cleared`, `watch` or `escalated`. Needs `decisions`. | `POST /v1/groups/{group_id}/people/{person_id}/review` |
| `create_assessment` | Assess identifiers (email, phone, username, name, IP) for an `account_creation`, `login` or `purchase` flow. Sends a fresh Idempotency-Key when you give none. | `POST /v1/assessments` |
| `get_assessment` | Read the latest version of one assessment. | `GET /v1/assessments/{assessment_id}` |
| `wait_for_assessment` | Poll a pending assessment, at the interval Retry-After asks for, until it settles or `timeout_seconds` (default 25, at most 55) pass. | `GET /v1/assessments/{assessment_id}` |
| `query_assessments` | Page through one account's unexpired assessments, newest first. | `POST /v1/assessments/query` |
| `get_account` | Read an account's one current risk: the score, a decision (`allow`, `step_up`, `review`, `block`, or `held` while a held flow waits) for each flow, and the assessment it comes from. Needs the `history` scope. | `GET /v1/accounts/{account_id}` |
| `list_account_assessments` | Page through one account's unexpired assessments, newest first, with the account id in the URL. Needs the `history` scope. | `GET /v1/accounts/{account_id}/assessments` |
| `list_linked_accounts` | List the other accounts in this environment that submitted an email, phone or username this account submitted, with both submitted witnesses. Needs `history`, or `investigate` with `evidence`. | `GET /v1/accounts/{account_id}/links` |
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
| `get_settings` | Read the environment's retention, flow thresholds, admission, refused sources and daily screening cap. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/settings/{environment}` |
| `update_settings` | Change only what the body names, in one transaction. Needs the `management` scope. | `PATCH /v1/workspaces/{workspace_id}/settings/{environment}` |
| `list_list_entries` | List the environment's allow and block list, oldest first. Needs the `management` scope. | `GET /v1/workspaces/{workspace_id}/lists/{environment}` |
| `create_list_entry` | Add an email or email domain to the block or allow list; the accounts it matches are decided again. Needs the `management` scope. | `POST /v1/workspaces/{workspace_id}/lists/{environment}` |
| `delete_list_entry` | Delete an entry; the accounts it matched go back to their scored decision. Needs the `management` scope. | `DELETE /v1/workspaces/{workspace_id}/lists/{environment}/{list_entry_id}` |

The table shows the most used tools. [Connect an agent](https://docs.noresponse.org/guides/agents) lists every tool with its required scope, including the other group, review and evaluation tools.

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
