// The MCP server's tools against a recording fake of the API: which tools
// exist, which key each request carries, and how waiting behaves. Runs with no
// network; tests/mock-server.test.mjs runs the same tools against the mock
// server generated from the SDK document.
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { CALLER_KEY, fixture, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

const PENDING = fixture("assessment-view-pending.json");
const PARTIAL = fixture("assessment-view-partial.json");
// The same assessment as PENDING, settled: the tenant's block threshold was reached.
const COMPLETE = fixture("assessment-view-block.json");
const OUTCOME = fixture("assessment-outcome.json");
const LIST = fixture("assessment-list.json");
const ACCOUNT = fixture("account.json");
const DELETION = fixture("account-deletion.json");
const ASSESSMENT_DELETION = fixture("assessment-deletion.json");
const ENDPOINTS = fixture("webhook-endpoint-list.json");
const CREATED = fixture("webhook-endpoint-created.json");
const SENT = fixture("webhook-test-assessment-updated.json");
const ENDPOINT = CREATED.endpoint.endpoint_id;
const INTEGRATION = fixture("integration-auth0.json");
const INTEGRATION_ROTATED = fixture("integration-auth0-rotated.json");
const INTEGRATIONS = fixture("integration-list.json");
const INT_ID = INTEGRATION.integration_id;
const ID = PENDING.id;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const TOOLS = [
  "create_assessment",
  "create_integration",
  "create_webhook_endpoint",
  "delete_account",
  "delete_assessment",
  "delete_integration",
  "delete_webhook_endpoint",
  "get_account",
  "get_assessment",
  "list_account_assessments",
  "list_integrations",
  "list_webhook_deliveries",
  "list_webhook_endpoints",
  "query_assessments",
  "record_outcome",
  "replay_webhook_delivery",
  "rotate_integration_secret",
  "rotate_webhook_signing_key",
  "send_webhook_test_event",
  "wait_for_assessment",
];

// Answers by route; GET of the assessment answers `unsettled` (pending by
// default) until `settleAfter` polls have been made.
function fakeAPI() {
  const state = { settleAfter: 0, gets: 0, status: 200, unsettled: PENDING };
  const api = recordingAPI({
    respond(req) {
      if (state.status !== 200) {
        return { status: state.status, headers: { "content-type": "application/problem+json" }, body: { type: "about:blank", title: "Unauthorized", status: state.status, code: "unauthenticated" } };
      }
      if (req.method === "POST" && req.path === "/v1/assessments") return { status: 202, headers: { "retry-after": "1" }, body: PENDING };
      if (req.method === "POST" && req.path === "/v1/assessments/query") return { body: LIST };
      if (req.method === "GET" && req.path === "/v1/accounts/acct_7f3a9c") return { body: ACCOUNT };
      if (req.method === "DELETE" && req.path === "/v1/accounts/acct_7f3a9c") return { body: DELETION };
      if (req.method === "DELETE" && req.path === `/v1/assessments/${ASSESSMENT_DELETION.id}`) return { body: ASSESSMENT_DELETION };
      if (req.method === "GET" && req.path.startsWith("/v1/accounts/acct_7f3a9c/assessments")) return { body: LIST };
      if (req.method === "POST" && req.path === `/v1/assessments/${ID}/outcomes`) return { status: 201, body: OUTCOME };
      if (req.method === "GET" && req.path === "/v1/webhooks") return { body: ENDPOINTS };
      if (req.method === "POST" && req.path === "/v1/webhooks") return { status: 201, body: CREATED };
      if (req.method === "POST" && req.path === `/v1/webhooks/${ENDPOINT}/test`) return { status: 202, body: SENT };
      if (req.method === "DELETE" && req.path === `/v1/webhooks/${ENDPOINT}`) return { status: 204 };
      if (req.method === "POST" && req.path === "/v1/integrations") return { status: 201, body: INTEGRATION };
      if (req.method === "GET" && req.path === "/v1/integrations") return { body: INTEGRATIONS };
      if (req.method === "POST" && req.path === `/v1/integrations/${INT_ID}/rotate`) return { body: INTEGRATION_ROTATED };
      if (req.method === "DELETE" && req.path === `/v1/integrations/${INT_ID}`) return { status: 204 };
      if (req.method === "GET" && req.path.startsWith(`/v1/assessments/${ID}`)) {
        state.gets += 1;
        return state.gets <= state.settleAfter
          ? { headers: { "retry-after": "1" }, body: state.unsettled }
          : { body: COMPLETE };
      }
      return { status: 404, body: { status: 404, code: "not_found" } };
    },
  });
  return { state, api };
}

describe("stdio server (npx @noresponse/mcp start)", () => {
  let fake, api, client;
  before(async () => {
    fake = fakeAPI();
    api = await fake.api;
    client = await stdioClient({ serverURL: api.url, apiKey: CALLER_KEY });
  });
  after(async () => {
    await client?.close();
    await api?.close();
  });

  test("exposes the assessment, webhook endpoint and integration tools, and not API key rotation or key usage", async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((t) => t.name).sort(), TOOLS);
    assert.ok(!tools.some((t) => /api_key|rotate_key|key_usage/i.test(t.name)));
    const readOnly = Object.fromEntries(tools.map((t) => [t.name, t.annotations?.readOnlyHint === true]));
    assert.deepEqual(readOnly, {
      create_assessment: false,
      create_webhook_endpoint: false,
      delete_account: false,
      delete_assessment: false,
      delete_webhook_endpoint: false,
      create_integration: false,
      delete_integration: false,
      get_account: true,
      get_assessment: true,
      list_account_assessments: true,
      list_webhook_endpoints: true,
      list_webhook_deliveries: true,
      replay_webhook_delivery: false,
      list_integrations: true,
      query_assessments: true,
      record_outcome: false,
      rotate_webhook_signing_key: false,
      send_webhook_test_event: false,
      rotate_integration_secret: false,
      wait_for_assessment: true,
    });
    const destructive = tools.filter((t) => t.annotations?.destructiveHint === true).map((t) => t.name);
    assert.deepEqual(destructive.sort(), ["delete_account", "delete_assessment", "delete_integration", "delete_webhook_endpoint"]);
  });

  test("the webhook endpoint tools call their routes with the caller's key", async () => {
    api.requests.length = 0;
    const listed = await client.callTool({ name: "list_webhook_endpoints", arguments: {} });
    assert.ok(!listed.isError, listed.content?.[0]?.text);
    assert.deepEqual(json(listed), ENDPOINTS);
    const created = await client.callTool({
      name: "create_webhook_endpoint",
      arguments: { request: { url: "https://hooks.example.com/noresponse" } },
    });
    assert.ok(!created.isError, created.content?.[0]?.text);
    assert.equal(json(created).endpoint.endpoint_id, ENDPOINT);
    const sent = await client.callTool({
      name: "send_webhook_test_event",
      arguments: { request: { endpoint_id: ENDPOINT, body: { event: "assessment.updated" } } },
    });
    assert.ok(!sent.isError, sent.content?.[0]?.text);
    assert.deepEqual(json(sent), SENT);
    const deleted = await client.callTool({ name: "delete_webhook_endpoint", arguments: { request: { endpoint_id: ENDPOINT } } });
    assert.ok(!deleted.isError, deleted.content?.[0]?.text);
    assert.deepEqual(api.requests.map((r) => `${r.method} ${r.path}`), [
      "GET /v1/webhooks",
      "POST /v1/webhooks",
      `POST /v1/webhooks/${ENDPOINT}/test`,
      `DELETE /v1/webhooks/${ENDPOINT}`,
    ]);
    assert.deepEqual(api.requests[1].body, { url: "https://hooks.example.com/noresponse" });
    assert.deepEqual(api.requests[2].body, { event: "assessment.updated" });
    for (const req of api.requests) {
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.equal(req.headers["idempotency-key"], undefined);
    }
  });

  test("create_assessment sends the key from NORESPONSE_API_KEY and a fresh Idempotency-Key", async () => {
    api.requests.length = 0;
    const body = { account_id: "acct_7f3a9c", flow: "account_creation", identifiers: { email: "new.user@example.com" } };
    const first = await client.callTool({ name: "create_assessment", arguments: { request: { body } } });
    const second = await client.callTool({ name: "create_assessment", arguments: { request: { body } } });
    assert.ok(!first.isError, first.content?.[0]?.text);
    assert.equal(json(first).status, "pending");
    assert.equal(api.requests.length, 2);
    for (const req of api.requests) {
      assert.equal(req.method, "POST");
      assert.equal(req.path, "/v1/assessments");
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.match(req.headers["idempotency-key"], UUID);
      assert.deepEqual(req.body, body);
    }
    assert.notEqual(api.requests[0].headers["idempotency-key"], api.requests[1].headers["idempotency-key"]);
    assert.ok(!second.isError);
  });

  test("create_assessment keeps an Idempotency-Key the agent gives", async () => {
    api.requests.length = 0;
    const key = "account-acct_7f3a9c-0001";
    await client.callTool({
      name: "create_assessment",
      arguments: { request: { idempotencyKey: key, body: { account_id: "acct_7f3a9c", flow: "account_creation", identifiers: { email: "new.user@example.com" } } } },
    });
    assert.equal(api.requests[0].headers["idempotency-key"], key);
  });

  test("record_outcome posts the outcome with the caller's key", async () => {
    api.requests.length = 0;
    const result = await client.callTool({
      name: "record_outcome",
      arguments: { request: { assessment_id: ID, body: { outcome: "false_positive" } } },
    });
    assert.ok(!result.isError, result.content?.[0]?.text);
    assert.deepEqual(json(result), OUTCOME);
    const [req] = api.requests;
    assert.equal(req.path, `/v1/assessments/${ID}/outcomes`);
    assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
    assert.match(req.headers["idempotency-key"], UUID);
    assert.deepEqual(req.body, { outcome: "false_positive" });
  });

  test("query_assessments posts the account id in the body", async () => {
    api.requests.length = 0;
    const result = await client.callTool({ name: "query_assessments", arguments: { request: { account_id: "acct_7f3a9c", limit: 5 } } });
    assert.deepEqual(json(result), LIST);
    const [req] = api.requests;
    assert.equal(req.path, "/v1/assessments/query");
    assert.deepEqual(req.body, { account_id: "acct_7f3a9c", limit: 5 });
    assert.equal(req.headers["idempotency-key"], undefined);
  });

  test("get_account and list_account_assessments read the account with the caller's key", async () => {
    api.requests.length = 0;
    const account = await client.callTool({ name: "get_account", arguments: { request: { account_id: "acct_7f3a9c" } } });
    assert.ok(!account.isError, account.content?.[0]?.text);
    assert.deepEqual(json(account), ACCOUNT);
    const history = await client.callTool({
      name: "list_account_assessments",
      arguments: { request: { account_id: "acct_7f3a9c", limit: 5, response_mode: "standard" } },
    });
    assert.ok(!history.isError, history.content?.[0]?.text);
    assert.deepEqual(json(history), LIST);
    assert.deepEqual(api.requests.map((r) => `${r.method} ${r.path}`), [
      "GET /v1/accounts/acct_7f3a9c",
      "GET /v1/accounts/acct_7f3a9c/assessments?limit=5&response_mode=standard",
    ]);
    for (const req of api.requests) {
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.equal(req.headers["idempotency-key"], undefined);
    }
  });

  test("delete_account erases the account with the caller's key", async () => {
    api.requests.length = 0;
    const erased = await client.callTool({ name: "delete_account", arguments: { request: { account_id: "acct_7f3a9c" } } });
    assert.ok(!erased.isError, erased.content?.[0]?.text);
    assert.deepEqual(json(erased), DELETION);
    assert.deepEqual(api.requests.map((r) => `${r.method} ${r.path}`), ["DELETE /v1/accounts/acct_7f3a9c"]);
    assert.equal(api.requests[0].headers.authorization, `Bearer ${CALLER_KEY}`);
  });

  test("delete_assessment deletes one assessment with the caller's key", async () => {
    api.requests.length = 0;
    const removed = await client.callTool({ name: "delete_assessment", arguments: { request: { assessment_id: ASSESSMENT_DELETION.id } } });
    assert.ok(!removed.isError, removed.content?.[0]?.text);
    assert.deepEqual(json(removed), ASSESSMENT_DELETION);
    assert.deepEqual(api.requests.map((r) => `${r.method} ${r.path}`), [`DELETE /v1/assessments/${ASSESSMENT_DELETION.id}`]);
    assert.equal(api.requests[0].headers.authorization, `Bearer ${CALLER_KEY}`);
  });

  test("the integration tools call their routes with the caller's key and no Idempotency-Key", async () => {
    api.requests.length = 0;
    const created = await client.callTool({ name: "create_integration", arguments: { request: { platform: "auth0" } } });
    assert.ok(!created.isError, created.content?.[0]?.text);
    assert.equal(json(created).integration_id, INT_ID);
    const listed = await client.callTool({ name: "list_integrations", arguments: {} });
    assert.ok(!listed.isError, listed.content?.[0]?.text);
    assert.deepEqual(json(listed), INTEGRATIONS);
    const rotated = await client.callTool({
      name: "rotate_integration_secret",
      arguments: { request: { integration_id: INT_ID, body: {} } },
    });
    assert.ok(!rotated.isError, rotated.content?.[0]?.text);
    assert.equal(json(rotated).secret, INTEGRATION_ROTATED.secret);
    const deleted = await client.callTool({ name: "delete_integration", arguments: { request: { integration_id: INT_ID } } });
    assert.ok(!deleted.isError, deleted.content?.[0]?.text);
    assert.deepEqual(
      api.requests.map((r) => [r.method, r.path]),
      [
        ["POST", "/v1/integrations"],
        ["GET", "/v1/integrations"],
        ["POST", `/v1/integrations/${INT_ID}/rotate`],
        ["DELETE", `/v1/integrations/${INT_ID}`],
      ],
    );
    assert.deepEqual(api.requests[0].body, { platform: "auth0" });
    assert.deepEqual(api.requests[2].body, {});
    for (const req of api.requests) {
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.equal(req.headers["idempotency-key"], undefined);
    }
  });

  test("wait_for_assessment polls at Retry-After until the assessment settles", async () => {
    api.requests.length = 0;
    fake.state.gets = 0;
    fake.state.settleAfter = 2;
    const started = Date.now();
    const result = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 20 } });
    const elapsed = Date.now() - started;
    fake.state.settleAfter = 0;
    assert.ok(!result.isError, result.content?.[0]?.text);
    assert.equal(json(result).status, "complete");
    assert.equal(json(result).account.risk.decision, "block");
    assert.equal(json(result).detail.assessment_version, COMPLETE.detail.assessment_version);
    assert.equal(api.requests.length, 3);
    assert.ok(elapsed >= 1900, `two Retry-After: 1 waits took only ${elapsed} ms`);
    for (const req of api.requests) {
      assert.equal(req.method, "GET");
      assert.equal(req.path, `/v1/assessments/${ID}`);
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
    }
  });

  test("wait_for_assessment says the assessment is still pending when the time runs out", async () => {
    fake.state.gets = 0;
    fake.state.settleAfter = 1000;
    const started = Date.now();
    const result = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 1 } });
    const elapsed = Date.now() - started;
    fake.state.settleAfter = 0;
    assert.ok(!result.isError);
    assert.match(result.content[0].text, /still pending after 1 s/);
    assert.equal(json(result, 1).status, "pending");
    assert.equal(json(result, 1).account, undefined);
    // Retry-After 1 s fills the whole second: no poll starts once the deadline has passed.
    assert.equal(fake.state.gets, 1);
    assert.ok(elapsed < 1800, `took ${elapsed} ms`);
  });

  test("wait_for_assessment keeps polling a partial answer until it is complete", async () => {
    fake.state.gets = 0;
    fake.state.settleAfter = 1;
    fake.state.unsettled = PARTIAL;
    const result = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 20 } });
    fake.state.settleAfter = 0;
    fake.state.unsettled = PENDING;
    assert.ok(!result.isError, result.content?.[0]?.text);
    assert.equal(json(result).status, "complete");
    assert.equal(fake.state.gets, 2);
  });

  test("wait_for_assessment returns the latest partial answer when the time runs out", async () => {
    fake.state.gets = 0;
    fake.state.settleAfter = 1000;
    fake.state.unsettled = PARTIAL;
    const result = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 1 } });
    fake.state.settleAfter = 0;
    fake.state.unsettled = PENDING;
    assert.ok(!result.isError);
    assert.match(result.content[0].text, /still partial after 1 s/);
    assert.equal(json(result, 1).status, "partial");
  });

  test("an API error comes back as a tool error with the problem document", async () => {
    fake.state.status = 401;
    const result = await client.callTool({ name: "get_assessment", arguments: { request: { assessment_id: ID } } });
    const waited = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID } });
    fake.state.status = 200;
    assert.equal(result.isError, true);
    assert.equal(json(result).code, "unauthenticated");
    assert.equal(waited.isError, true);
    assert.equal(json(waited).code, "unauthenticated");
  });
});

describe("Cloudflare Worker (mcp.noresponse.org)", () => {
  let fake, api, worker;
  before(async () => {
    fake = fakeAPI();
    api = await fake.api;
    worker = await workerServer({ serverURL: api.url });
  });
  after(async () => {
    await worker?.close();
    await api?.close();
  });

  test("lists the same tools", async () => {
    const client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
    const { tools } = await client.listTools();
    await client.close();
    assert.deepEqual(tools.map((t) => t.name).sort(), TOOLS);
  });

  test("each caller's requests carry that caller's key and no other", async () => {
    const otherKey = "nrk_mock_" + "d".repeat(24);
    const alice = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
    const bob = await httpClient({ url: worker.url, apiKey: otherKey });
    api.requests.length = 0;
    await alice.callTool({ name: "get_assessment", arguments: { request: { assessment_id: ID } } });
    await bob.callTool({ name: "get_assessment", arguments: { request: { assessment_id: ID } } });
    await alice.callTool({ name: "query_assessments", arguments: { request: { account_id: "acct_7f3a9c" } } });
    await alice.close();
    await bob.close();
    assert.deepEqual(api.requests.map((r) => r.headers.authorization), [
      `Bearer ${CALLER_KEY}`,
      `Bearer ${otherKey}`,
      `Bearer ${CALLER_KEY}`,
    ]);
  });

  test("a call with no key reaches the API with no Authorization header", async () => {
    const client = await httpClient({ url: worker.url });
    api.requests.length = 0;
    await client.callTool({ name: "get_assessment", arguments: { request: { assessment_id: ID } } });
    await client.close();
    assert.equal(api.requests.length, 1);
    assert.equal(api.requests[0].headers.authorization, undefined);
  });

  test("create_assessment and wait_for_assessment work through the Worker", async () => {
    const client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
    fake.state.gets = 0;
    fake.state.settleAfter = 1;
    api.requests.length = 0;
    const created = await client.callTool({
      name: "create_assessment",
      arguments: { request: { body: { account_id: "acct_7f3a9c", flow: "account_creation", identifiers: { email: "new.user@example.com" } } } },
    });
    const waited = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: json(created).id } });
    fake.state.settleAfter = 0;
    await client.close();
    assert.equal(json(created).status, "pending");
    assert.equal(json(waited).status, "complete");
    assert.match(api.requests[0].headers["idempotency-key"], UUID);
    assert.ok(api.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });
});
