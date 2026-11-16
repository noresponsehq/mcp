import assert from "node:assert/strict";
import test from "node:test";
import { CALLER_KEY, httpClient, json, recordingAPI, stdioClient, workerServer } from "./helpers.mjs";

for (const transport of ["stdio", "worker"]) {
  test(`${transport}: ongoing groups decode null dates and retain explicit PATCH nulls`, async () => {
    const group = { id: "grp_example", environment: "test", name: "Harbour building", starts_at: null, ends_at: null, principals: [], topics: [], people: 0, version: 1, created_by: "test", created_at: "2026-11-15T10:00:00Z", updated_at: "2026-11-15T10:00:00Z" };
    const api = await recordingAPI({ respond: req => ({ status: req.method === "POST" ? 201 : 200, body: group }) });
    let client, worker;
    try {
      if (transport === "stdio") client = await stdioClient({ serverURL: api.url, apiKey: CALLER_KEY });
      else {
        worker = await workerServer({ serverURL: api.url });
        client = await httpClient({ url: worker.url, apiKey: CALLER_KEY });
      }
      for (const [name, request] of [
        ["create_group", { body: { name: group.name } }],
        ["update_group", { group_id: group.id, body: { name: group.name } }],
        ["update_group", { group_id: group.id, body: { starts_at: null, ends_at: null } }],
      ]) {
        const result = await client.callTool({ name, arguments: { request } });
        assert(!result.isError, result.content?.[0]?.text);
        assert.equal(json(result).starts_at, null);
        assert.equal(json(result).ends_at, null);
      }
      assert.deepEqual(api.requests.map(req => req.body), [{ name: group.name }, { name: group.name }, { starts_at: null, ends_at: null }]);
    } finally {
      await client?.close();
      await worker?.close();
      await api.close();
    }
  });
}
