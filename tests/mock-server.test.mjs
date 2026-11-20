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

async function everyTool(client) {
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
    assert.ok(proxy.requests.length >= 4);
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
    assert.ok(proxy.requests.length >= 4);
    assert.ok(proxy.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });
});
