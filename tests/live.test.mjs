// The stdio server and the Worker against a live API, as an agent uses them.
//
// Skipped unless NORESPONSE_LIVE_URL and NORESPONSE_LIVE_API_KEY name an API
// and a key with the investigations and webhooks scopes (a test key keeps it
// off real sources). Each server gets the 404 of an unknown investigation and
// lists the webhook endpoints. Each step writes its name to
// NORESPONSE_LIVE_REPORT, and "done" at the end, so a failure names the
// server and the tool (integrations/regression/suites/sdks.sh).
import assert from "node:assert/strict";
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
  const { result: missing } = await call(client, server, "get_investigation", { request: { investigation_id: "inv_" + "0".repeat(26) } });
  assert.ok(missing.isError);
  assert.equal(json(missing).status, 404);
  assert.equal(json(missing).code, "not_found");

  assert.ok(Array.isArray((await call(client, server, "list_webhook_endpoints", {})).ok().items));
}

test("an agent reads an investigation and lists webhook endpoints through the stdio server and the Worker", { skip }, async () => {
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
