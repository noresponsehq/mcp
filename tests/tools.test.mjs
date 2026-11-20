// The MCP server's tools against a recording fake of the API: which tools
// exist, which key each request carries. Runs with no
// network; tests/mock-server.test.mjs runs the same tools against the mock
// server generated from the SDK document.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, before, describe, test } from "node:test";
import { CALLER_KEY, fixture, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

const ENDPOINTS = fixture("webhook-endpoint-list.json");
const CREATED = fixture("webhook-endpoint-created.json");
const SENT = fixture("webhook-test-verification.json");
const ENDPOINT = CREATED.endpoint.endpoint_id;
const KEYS = fixture("key-list.json");
const REVOKED = fixture("key-revoked.json");
const SETTINGS = fixture("settings.json");
const WORKSPACE = SETTINGS.workspace_id;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const TOOL_POLICY = JSON.parse(readFileSync(new URL("fixtures/mcp-tool-policy.json", import.meta.url), "utf8"));
const TOOLS = TOOL_POLICY.map((tool) => tool.name).sort();

// Answers by route; every other route answers 404.
function fakeAPI() {
  const state = { status: 200 };
  const api = recordingAPI({
    respond(req) {
      if (state.status !== 200) {
        return { status: state.status, headers: { "content-type": "application/problem+json" }, body: { type: "about:blank", title: "Unauthorized", status: state.status, code: "unauthenticated" } };
      }
      if (req.method === "GET" && req.path === "/v1/webhooks") return { body: ENDPOINTS };
      if (req.method === "POST" && req.path === "/v1/webhooks") return { status: 201, body: CREATED };
      if (req.method === "POST" && req.path === `/v1/webhooks/${ENDPOINT}/test`) return { status: 202, body: SENT };
      if (req.method === "DELETE" && req.path === `/v1/webhooks/${ENDPOINT}`) return { status: 204 };
      if (req.method === "GET" && req.path === `/v1/workspaces/${WORKSPACE}/keys`) return { body: KEYS };
      if (req.method === "DELETE" && req.path === `/v1/workspaces/${WORKSPACE}/keys/${REVOKED.id}`) return { body: REVOKED };
      if (req.path === `/v1/workspaces/${WORKSPACE}/settings/live`) return { body: SETTINGS };
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

  test("exposes exactly the reviewed customer tools without key or invite token issuance", async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((t) => t.name).sort(), TOOLS);
    assert.ok(!tools.some((t) => /api_key|rotate_key|create_key|key_usage|create_invite|resend_invite/i.test(t.name)));
    for (const hint of ["readOnlyHint", "destructiveHint", "idempotentHint"]) {
      const observed = Object.fromEntries(tools.map((tool) => [tool.name, tool.annotations?.[hint] === true]));
      const expected = Object.fromEntries(TOOL_POLICY.map((tool) => [tool.name, tool[hint] === true]));
      assert.deepEqual(observed, expected, hint);
    }
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
      arguments: { request: { endpoint_id: ENDPOINT, body: { event: "endpoint.verification" } } },
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
    assert.deepEqual(api.requests[2].body, { event: "endpoint.verification" });
    for (const req of api.requests) {
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.equal(req.headers["idempotency-key"], undefined);
    }
  });

  test("investigation and group tools supply and preserve idempotency keys", async () => {
    const cases = [
      ["create_investigation", "/v1/investigations", { body: { person_id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM", depth: "standard" } }],
    ];
    for (const [name, path, request] of cases) {
      api.requests.length = 0;
      const supplied = `customer-platform-${name}`;
      for (const idempotencyKey of [undefined, supplied]) {
        // These routes deliberately answer404 in this fake. Reaching the
        // transport proves the generated argument validator admitted omission
        // and the hook inserted the required header before the HTTP call.
        const result = await client.callTool({ name, arguments: { request: { ...request, ...(idempotencyKey ? { idempotencyKey } : {}) } } });
        assert.ok(result.isError, name);
      }
      assert.equal(api.requests.length, 2, name);
      for (const recorded of api.requests) {
        assert.equal(recorded.method, "POST", name);
        assert.equal(recorded.path, path, name);
        assert.equal(recorded.headers.authorization, `Bearer ${CALLER_KEY}`, name);
        assert.deepEqual(recorded.body, request.body, name);
      }
      assert.match(api.requests[0].headers["idempotency-key"], UUID, name);
      assert.equal(api.requests[1].headers["idempotency-key"], supplied, name);
    }
  });

  test("the key and settings tools call their routes with the caller's key", async () => {
    api.requests.length = 0;
    const listed = await client.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
    assert.ok(!listed.isError, listed.content?.[0]?.text);
    assert.deepEqual(json(listed), KEYS);
    const revoked = await client.callTool({ name: "revoke_key", arguments: { request: { workspace_id: WORKSPACE, key_id: REVOKED.id } } });
    assert.ok(!revoked.isError, revoked.content?.[0]?.text);
    assert.equal(json(revoked).status, "revoked");
    const read = await client.callTool({ name: "get_settings", arguments: { request: { workspace_id: WORKSPACE, environment: "live" } } });
    assert.ok(!read.isError, read.content?.[0]?.text);
    const changed = await client.callTool({
      name: "update_settings",
      arguments: { request: { workspace_id: WORKSPACE, environment: "live", body: { retention_days: 30 } } },
    });
    assert.ok(!changed.isError, changed.content?.[0]?.text);
    assert.deepEqual(
      api.requests.map((r) => [r.method, r.path]),
      [
        ["GET", `/v1/workspaces/${WORKSPACE}/keys`],
        ["DELETE", `/v1/workspaces/${WORKSPACE}/keys/${REVOKED.id}`],
        ["GET", `/v1/workspaces/${WORKSPACE}/settings/live`],
        ["PATCH", `/v1/workspaces/${WORKSPACE}/settings/live`],
      ],
    );
    assert.deepEqual(api.requests[3].body, { retention_days: 30 });
    for (const req of api.requests) {
      assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      assert.equal(req.headers["nr-acting-user"], undefined);
    }
  });

  test("an API error comes back as a tool error with the problem document", async () => {
    fake.state.status = 401;
    const result = await client.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
    fake.state.status = 200;
    assert.equal(result.isError, true);
    const text = result.content[0].text;
    assert.match(text, /^HTTP 401 \S+\. Check the API key and that it has the scope this tool requires\.\n/);
    assert.equal(JSON.parse(text.slice(text.indexOf("\n") + 1)).code, "unauthenticated");
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
    await alice.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
    await bob.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
    await alice.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
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
    await client.callTool({ name: "list_keys", arguments: { request: { workspace_id: WORKSPACE } } });
    await client.close();
    assert.equal(api.requests.length, 1);
    assert.equal(api.requests[0].headers.authorization, undefined);
  });

  test("create_investigation supplies an Idempotency-Key through the Worker", async () => {
    const client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
    api.requests.length = 0;
    await client.callTool({
      name: "create_investigation",
      arguments: { request: { body: { person_id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM", depth: "standard" } } },
    });
    await client.close();
    assert.equal(api.requests.length, 1);
    assert.match(api.requests[0].headers["idempotency-key"], UUID);
    assert.equal(api.requests[0].headers.authorization, `Bearer ${CALLER_KEY}`);
  });
});
