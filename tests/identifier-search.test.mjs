// Generated MCP argument/response contract through both supported transports.
import assert from "node:assert/strict";
import test from "node:test";
import { CALLER_KEY, fixture, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

for (const transport of ["stdio", "worker"]) {
  test(`${transport}: identifier search preserves namespace, match basis and submitted provenance`, async () => {
    const revision = { ...fixture("assessment-view-complete.json") };
    delete revision.account;
    delete revision.meta;
    delete revision.assessment_url;
    const identifier = { kind: "username", value: "janedoe", match: "canonical", namespace: "customer" };
    const matched = { kind: "username", value: "JaneDoe", match_basis: "canonical", namespace: "customer", provenance: "submitted", assessment_id: revision.id };
    const api = await recordingAPI({ respond: req => ({ body: { ...(req.path === "/v1/assessments/search" ? { retention_days: 365 } : {}), schema_version: "1", total: 1, total_capped: false, items: [
      req.path === "/v1/accounts/search" ? { account_id: revision.detail.account_id, latest: revision, assessments: 2, matched_identifier: matched } : { ...revision, matched_identifier: matched },
    ] } }) });
    let client, worker;
    try {
      if (transport === "stdio") client = await stdioClient({ serverURL: api.url, apiKey: CALLER_KEY });
      else {
        worker = await workerServer({ serverURL: api.url });
        client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
      }
      const { tools } = await client.listTools();
      for (const name of ["search_accounts", "search_assessments"]) assert(tools.some(tool => tool.name === name));
      for (const [name, request] of [["search_accounts", { identifier, limit: 1 }], ["search_assessments", { from: "2026-10-01T00:00:00Z", to: "2026-10-02T00:00:00Z", identifier, limit: 1 }]]) {
        const result = await client.callTool({ name, arguments: { request } });
        assert(!result.isError, result.content?.[0]?.text);
        assert.deepEqual(json(result).items[0].matched_identifier, matched);
      }
      assert.deepEqual(api.requests.map(req => req.path), ["/v1/accounts/search", "/v1/assessments/search"]);
      for (const req of api.requests) {
        assert.deepEqual(req.body.identifier, identifier);
        assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      }
    } finally {
      await client?.close();
      await worker?.close();
      await api.close();
    }
  });
}
