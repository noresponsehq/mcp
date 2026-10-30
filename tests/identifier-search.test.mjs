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

for (const transport of ["stdio", "worker"]) {
  test(`${transport}: combined search carries explicit scope, nested logic and indexed witnesses`, async () => {
    const revision = { ...fixture("assessment-view-complete.json") };
    delete revision.account;
    delete revision.meta;
    delete revision.assessment_url;
    const expression = { and: [
      { term: { kind: "phone", value: "+14155552671", match: "canonical" } },
      { or: [
        { term: { kind: "email", value: "other@example.com", match: "exact" } },
        { term: { kind: "username", value: "janedoe", match: "canonical", namespace: "customer" } },
      ] },
    ] };
    const matches = [
      { kind: "phone", value: "+14155552671", match_basis: "canonical", provenance: "submitted", assessment_id: revision.id, term_index: 0 },
      { kind: "username", value: "JaneDoe", match_basis: "canonical", namespace: "customer", provenance: "submitted", assessment_id: revision.id, term_index: 2 },
    ];
    const api = await recordingAPI({ respond: req => ({ body: { ...(req.path === "/v1/assessments/search" ? { retention_days: 365 } : {}), schema_version: "1", total: 1, total_capped: false, items: [
      req.path === "/v1/accounts/search" ? { account_id: revision.detail.account_id, latest: revision, assessments: 2, matched_identifiers: matches } : { ...revision, matched_identifiers: matches },
    ] } }) });
    let client, worker;
    try {
      if (transport === "stdio") client = await stdioClient({ serverURL: api.url, apiKey: CALLER_KEY });
      else {
        worker = await workerServer({ serverURL: api.url });
        client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
      }
      for (const [name, request] of [
        ["search_accounts", { identifier_expression: { scope: "account", expression }, limit: 1 }],
        ["search_assessments", { from: "2026-10-01T00:00:00Z", to: "2026-10-02T00:00:00Z", identifier_expression: { scope: "assessment", expression }, limit: 1 }],
      ]) {
        const result = await client.callTool({ name, arguments: { request } });
        assert(!result.isError, result.content?.[0]?.text);
        assert.deepEqual(json(result).items[0].matched_identifiers, matches);
      }
      assert.equal(api.requests.length, 2);
      api.requests.forEach((req, index) => {
        assert.deepEqual(req.body.identifier_expression, { scope: index ? "assessment" : "account", expression });
        assert.equal(req.body.identifier, undefined);
        assert.equal(req.headers.authorization, `Bearer ${CALLER_KEY}`);
      });
    } finally {
      await client?.close();
      await worker?.close();
      await api.close();
    }
  });
}

for (const transport of ["stdio", "worker"]) {
  test(`${transport}: linked accounts reads one account's links with both submitted witnesses`, async () => {
    const page = {"schema_version": "1", "account_id": "acct_8412", "items": [{"account_id": "acct_91b2d4", "shared_identifiers": [{"kind": "email", "match_basis": "mailbox", "provenance": "submitted", "account": {"value": "jane.doe@gmail.com", "assessment_id": "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM", "submitted_at": "2026-10-14T09:00:00.412Z"}, "linked_account": {"value": "janedoe+2@gmail.com", "assessment_id": "asm_01JA3B1C2D3E4F5G6H7J8K9M0N", "submitted_at": "2026-10-20T17:42:10.006Z"}}]}], "total": 1, "total_capped": false, "next_cursor": "next_fixture"};
    const api = await recordingAPI({ respond: () => ({ body: page }) });
    let client, worker;
    try {
      if (transport === "stdio") client = await stdioClient({ serverURL: api.url, apiKey: CALLER_KEY });
      else {
        worker = await workerServer({ serverURL: api.url });
        client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
      }
      const { tools } = await client.listTools();
      const tool = tools.find(candidate => candidate.name === "list_linked_accounts");
      assert(tool, "list_linked_accounts is exposed");
      assert.equal(tool.annotations?.readOnlyHint, true);
      const result = await client.callTool({ name: "list_linked_accounts", arguments: { request: { account_id: page.account_id, limit: 1, cursor: "next_fixture" } } });
      assert(!result.isError, result.content?.[0]?.text);
      assert.deepEqual(json(result).items[0].shared_identifiers, page.items[0].shared_identifiers);
      assert.equal(api.requests.length, 1);
      const url = new URL(api.requests[0].path, "https://example.com");
      assert.equal(url.pathname, `/v1/accounts/${page.account_id}/linked_accounts`);
      assert.equal(url.searchParams.get("limit"), "1");
      assert.equal(url.searchParams.get("cursor"), "next_fixture");
      assert.equal(api.requests[0].headers.authorization, `Bearer ${CALLER_KEY}`);
    } finally {
      await client?.close();
      await worker?.close();
      await api.close();
    }
  });
}
