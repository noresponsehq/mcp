// Every tool against the mock server generated from the SDK document, through
// a recording proxy so each request's key can be checked.
//
// Skipped unless NORESPONSE_MOCK_URL names a running mock server
// (`generate_sdks.py mockserver --serve`). The mock answers with the
// document's examples whatever the request says, so this proves the server's
// wiring (paths, encoding, the caller's key) and nothing about the live API.
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import { CALLER_KEY, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

const MOCK_URL = process.env.NORESPONSE_MOCK_URL;
const skip = MOCK_URL ? false : "set NORESPONSE_MOCK_URL to a running mock server";
const ID = "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM";

async function everyTool(client) {
  const created = await client.callTool({
    name: "create_assessment",
    arguments: { request: { body: { account_id: "acct_7f3a9c", identifiers: { email: "new.user@example.com" } } } },
  });
  assert.ok(!created.isError, created.content?.[0]?.text);
  assert.match(json(created).assessment_id, /^asm_/);
  const got = await client.callTool({ name: "get_assessment", arguments: { request: { assessment_id: ID } } });
  assert.ok(!got.isError, got.content?.[0]?.text);
  assert.match(json(got).assessment_id, /^asm_/);
  const waited = await client.callTool({ name: "wait_for_assessment", arguments: { assessment_id: ID, timeout_seconds: 5 } });
  assert.ok(!waited.isError, waited.content?.[0]?.text);
  assert.ok(waited.content.length >= 1);
  const listed = await client.callTool({ name: "query_assessments", arguments: { request: { account_id: "acct_7f3a9c" } } });
  assert.ok(!listed.isError, listed.content?.[0]?.text);
  assert.ok(Array.isArray(json(listed).items));
  const account = await client.callTool({ name: "get_account", arguments: { request: { account_id: "acct_7f3a9c" } } });
  assert.ok(!account.isError, account.content?.[0]?.text);
  assert.equal(json(account).id, "acct_7f3a9c");
  const history = await client.callTool({ name: "list_account_assessments", arguments: { request: { account_id: "acct_7f3a9c" } } });
  assert.ok(!history.isError, history.content?.[0]?.text);
  assert.ok(Array.isArray(json(history).items));
  const erased = await client.callTool({ name: "delete_account", arguments: { request: { account_id: "acct_7f3a9c" } } });
  assert.ok(!erased.isError, erased.content?.[0]?.text);
  assert.equal(json(erased).deleted, true);
  const recorded = await client.callTool({
    name: "record_outcome",
    arguments: { request: { assessment_id: ID, body: { outcome: "false_positive" } } },
  });
  assert.ok(!recorded.isError, recorded.content?.[0]?.text);
  // The mock answers with the document's example outcome, not the one sent.
  assert.match(json(recorded).assessment_id, /^asm_/);
  assert.equal(typeof json(recorded).outcome, "string");
  const endpoints = await client.callTool({ name: "list_webhook_endpoints", arguments: {} });
  assert.ok(!endpoints.isError, endpoints.content?.[0]?.text);
  assert.ok(Array.isArray(json(endpoints).items));
  const registered = await client.callTool({ name: "create_webhook_endpoint", arguments: { request: { url: "https://hooks.example.com/noresponse" } } });
  assert.ok(!registered.isError, registered.content?.[0]?.text);
  const endpoint = json(registered).endpoint.endpoint_id;
  assert.match(endpoint, /^whe_/);
  const sent = await client.callTool({
    name: "send_webhook_test_event",
    arguments: { request: { endpoint_id: endpoint, body: { event: "endpoint.verification" } } },
  });
  assert.ok(!sent.isError, sent.content?.[0]?.text);
  assert.match(json(sent).delivery_id, /^evt_/);
  const rotated = await client.callTool({ name: "rotate_webhook_signing_key", arguments: { request: { endpoint_id: endpoint, body: {} } } });
  assert.ok(!rotated.isError, rotated.content?.[0]?.text);
  // delete_webhook_endpoint is left out: the mock serves only operations
  // whose answer has a body, and DELETE answers 204. tools.test.mjs covers it.
  const integration = await client.callTool({ name: "create_integration", arguments: { request: { platform: "auth0" } } });
  assert.ok(!integration.isError, integration.content?.[0]?.text);
  const intID = json(integration).integration_id;
  assert.match(intID, /^int_/);
  const integrations = await client.callTool({ name: "list_integrations", arguments: {} });
  assert.ok(!integrations.isError, integrations.content?.[0]?.text);
  assert.ok(Array.isArray(json(integrations).items));
  const rotatedSecret = await client.callTool({
    name: "rotate_integration_secret",
    arguments: { request: { integration_id: intID, body: {} } },
  });
  assert.ok(!rotatedSecret.isError, rotatedSecret.content?.[0]?.text);
  assert.match(json(rotatedSecret).integration_id, /^int_/);
  // delete_integration is not called here: its 204 has no example, so the
  // generated mock server has no route for it. tests/tools.test.mjs covers it.
}

describe("against the mock server", { skip }, () => {
  let proxy;
  before(async () => {
    proxy = await recordingAPI({ upstream: MOCK_URL });
  });
  after(async () => {
    await proxy?.close();
  });

  test("the stdio server calls every operation with the key from the environment", async () => {
    const client = await stdioClient({ serverURL: proxy.url, apiKey: CALLER_KEY });
    proxy.requests.length = 0;
    try {
      await everyTool(client);
    } finally {
      await client.close();
    }
    assert.ok(proxy.requests.length >= 8);
    assert.ok(proxy.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });

  test("the Worker calls every operation with the caller's key", async () => {
    const worker = await workerServer({ serverURL: proxy.url });
    const client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
    proxy.requests.length = 0;
    try {
      await everyTool(client);
    } finally {
      await client.close();
      await worker.close();
    }
    assert.ok(proxy.requests.length >= 8);
    assert.ok(proxy.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });
});
