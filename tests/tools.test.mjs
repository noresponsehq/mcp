// The MCP server's tools against a recording fake of the API: which tools
// exist, which key each request carries, and how waiting behaves. Runs with no
// network; tests/mock-server.test.mjs runs the same tools against the mock
// server generated from the SDK document.
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { CALLER_KEY, fixture, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

const PENDING = fixture("assessment-pending.json");
const COMPLETE = fixture("assessment-complete.json");
const OUTCOME = fixture("assessment-outcome.json");
const LIST = fixture("assessment-list.json");
const ID = COMPLETE.assessment_id;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const TOOLS = ["create_assessment", "get_assessment", "query_assessments", "record_outcome", "wait_for_assessment"];

// Answers by route; GET of the assessment answers pending until `settleAfter`
// polls have been made.
function fakeAPI() {
  const state = { settleAfter: 0, gets: 0, status: 200 };
  const api = recordingAPI({
    respond(req) {
      if (state.status !== 200) {
        return { status: state.status, headers: { "content-type": "application/problem+json" }, body: { type: "about:blank", title: "Unauthorized", status: state.status, code: "unauthenticated" } };
      }
      if (req.method === "POST" && req.path === "/v1/assessments") return { status: 202, headers: { "retry-after": "1" }, body: PENDING };
      if (req.method === "POST" && req.path === "/v1/assessments/query") return { body: LIST };
      if (req.method === "POST" && req.path === `/v1/assessments/${ID}/outcomes`) return { status: 201, body: OUTCOME };
      if (req.method === "GET" && req.path.startsWith(`/v1/assessments/${ID}`)) {
        state.gets += 1;
        return state.gets <= state.settleAfter
          ? { headers: { "retry-after": "1" }, body: PENDING }
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

  test("exposes create, get, wait, query and record outcome, and not key rotation", async () => {
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((t) => t.name).sort(), TOOLS);
    assert.ok(!tools.some((t) => /rotate|key/i.test(t.name)));
    const readOnly = Object.fromEntries(tools.map((t) => [t.name, t.annotations?.readOnlyHint === true]));
    assert.deepEqual(readOnly, {
      create_assessment: false,
      get_assessment: true,
      query_assessments: true,
      record_outcome: false,
      wait_for_assessment: true,
    });
  });

  test("create_assessment sends the key from NORESPONSE_API_KEY and a fresh Idempotency-Key", async () => {
    api.requests.length = 0;
    const body = { account_id: "acct_7f3a9c", identifiers: { email: "new.user@example.com" } };
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
    const key = "signup-acct_7f3a9c-0001";
    await client.callTool({
      name: "create_assessment",
      arguments: { request: { idempotencyKey: key, body: { account_id: "acct_7f3a9c", identifiers: { email: "new.user@example.com" } } } },
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
    const result = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 1 } });
    fake.state.settleAfter = 0;
    assert.ok(!result.isError);
    assert.match(result.content[0].text, /still pending after 1 s/);
    assert.equal(json(result, 1).status, "pending");
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
      arguments: { request: { body: { account_id: "acct_7f3a9c", identifiers: { email: "new.user@example.com" } } } },
    });
    const waited = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: json(created).assessment_id } });
    fake.state.settleAfter = 0;
    await client.close();
    assert.equal(json(created).status, "pending");
    assert.equal(json(waited).status, "complete");
    assert.match(api.requests[0].headers["idempotency-key"], UUID);
    assert.ok(api.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });
});
