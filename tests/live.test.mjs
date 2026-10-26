// The stdio server and the Worker against a live API, as an agent uses them.
//
// Skipped unless NORESPONSE_LIVE_URL and NORESPONSE_LIVE_API_KEY name an API
// and a key with the assess, history and webhooks scopes (a test key keeps it
// off real sources). Each server assesses a synthetic account, waits for it,
// reads it back, lists its history and account, gets the 404 of an unknown
// assessment and lists the webhook endpoints. Each step writes its name to
// NORESPONSE_LIVE_REPORT, and "done" at the end, so a failure names the
// server and the tool (integrations/regression/suites/sdks.sh).
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { writeFileSync } from "node:fs";
import test from "node:test";
import { httpClient, json, stdioClient, workerServer } from "./helpers.mjs";

const { NORESPONSE_LIVE_URL: serverURL, NORESPONSE_LIVE_API_KEY: apiKey, NORESPONSE_LIVE_REPORT: report } = process.env;
const skip = serverURL && apiKey ? false : "set NORESPONSE_LIVE_URL and NORESPONSE_LIVE_API_KEY to run against a live API";
const step = (name) => report && writeFileSync(report, name);

async function call(client, server, name, args) {
  step(`${server} ${name}`);
  const result = await client.callTool({ name, arguments: args });
  return { result, ok: () => (assert.ok(!result.isError, result.content?.[0]?.text), json(result)) };
}

async function agentFlow(client, server) {
  const accountId = `sdk-live-mcp-${server}-${process.env.NORESPONSE_LIVE_RUN ?? randomUUID().slice(0, 8)}`;
  const body = { account_id: accountId, flow: "account_creation", identifiers: { email: "sdk-live@example.com" } };
  const created = (await call(client, server, "create_assessment", { request: { body } })).ok();
  assert.match(created.id, /^asm_/);
  assert.equal(created.detail.account_id, accountId);
  assert.equal((await call(client, server, "get_assessment", { request: { assessment_id: created.id } })).ok().id, created.id);

  const { result: waited } = await call(client, server, "wait_for_assessment", { assessment_id: created.id, timeout_seconds: 50 });
  assert.ok(!waited.isError, waited.content?.[0]?.text);
  // A settled answer is the assessment alone; a timed-out one leads with a note.
  const settled = json(waited, waited.content.length - 1);
  assert.ok(["complete", "partial"].includes(settled.status), settled.status);

  const history = (await call(client, server, "query_assessments", { request: { account_id: accountId, limit: 5 } })).ok();
  assert.ok(history.items.some((item) => item.assessment_id === created.id));
  const page = (await call(client, server, "list_account_assessments", { request: { account_id: accountId } })).ok();
  assert.ok(page.items.some((item) => item.assessment_id === created.id));
  const account = (await call(client, server, "get_account", { request: { account_id: accountId } })).ok();
  assert.equal(account.id, accountId);
  assert.equal(account.risk.decision, settled.account.risk.decision);

  const { result: missing } = await call(client, server, "get_assessment", { request: { assessment_id: "asm_" + "0".repeat(26) } });
  assert.ok(missing.isError);
  assert.equal(json(missing).status, 404);
  assert.equal(json(missing).code, "not_found");

  assert.ok(Array.isArray((await call(client, server, "list_webhook_endpoints", {})).ok().items));
}

test("an agent assesses, waits for and lists an account through the stdio server and the Worker", { skip }, async () => {
  const stdio = await stdioClient({ serverURL, apiKey });
  try {
    await agentFlow(stdio, "stdio");
  } finally {
    await stdio.close();
  }
  const worker = await workerServer({ serverURL });
  try {
    const client = await httpClient({ url: worker.url, apiKey });
    try {
      await agentFlow(client, "worker");
    } finally {
      await client.close();
    }
  } finally {
    await worker.close();
  }
  step("done");
});
