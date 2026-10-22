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
  const recorded = await client.callTool({
    name: "record_outcome",
    arguments: { request: { assessment_id: ID, body: { outcome: "false_positive" } } },
  });
  assert.ok(!recorded.isError, recorded.content?.[0]?.text);
  // The mock answers with the document's example outcome, not the one sent.
  assert.match(json(recorded).assessment_id, /^asm_/);
  assert.equal(typeof json(recorded).outcome, "string");
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
    assert.ok(proxy.requests.length >= 5);
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
    assert.ok(proxy.requests.length >= 5);
    assert.ok(proxy.requests.every((r) => r.headers.authorization === `Bearer ${CALLER_KEY}`));
  });
});
