// Test helpers: a recording HTTP API, and MCP clients for the stdio server
// and the Cloudflare Worker. Hand-written; not generated.
import { readFileSync } from "node:fs";
import http from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const FIXTURES = join(ROOT, "tests", "fixtures", "valid");
export const fixture = (name) => JSON.parse(readFileSync(join(FIXTURES, name), "utf8"));
export const CALLER_KEY = "nrk_mock_" + "c".repeat(24);

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(`http://127.0.0.1:${server.address().port}`));
  });
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

/**
 * An HTTP server that records every request. `respond(request)` returns
 * { status, headers, body } for it; with `upstream` set instead, the request
 * is forwarded there unchanged and the upstream answer is relayed.
 */
export async function recordingAPI({ respond, upstream } = {}) {
  const requests = [];
  const server = http.createServer(async (req, res) => {
    const body = await readBody(req);
    const record = {
      method: req.method,
      path: req.url,
      headers: req.headers,
      body: body.length ? JSON.parse(body.toString("utf8")) : undefined,
    };
    requests.push(record);
    if (upstream) {
      const headers = { ...req.headers };
      delete headers.host;
      delete headers["content-length"];
      const answer = await fetch(upstream + req.url, {
        method: req.method,
        headers,
        body: body.length ? body : undefined,
      });
      const out = Buffer.from(await answer.arrayBuffer());
      res.writeHead(answer.status, Object.fromEntries(
        [...answer.headers].filter(([name]) => !["content-encoding", "content-length", "transfer-encoding"].includes(name)),
      ));
      res.end(out);
      return;
    }
    const { status = 200, headers = {}, body: payload } = await respond(record);
    res.writeHead(status, { "content-type": "application/json", ...headers });
    res.end(payload === undefined ? "" : JSON.stringify(payload));
  });
  const url = await listen(server);
  return { url, requests, close: () => new Promise((resolve) => server.close(resolve)) };
}

/** The built stdio server, started the way npx starts it. */
export async function stdioClient({ serverURL, apiKey, args = [] }) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(ROOT, "bin", "mcp-server.js"), "start", "--server-url", serverURL, ...args],
    env: { PATH: process.env.PATH ?? "", ...(apiKey ? { NORESPONSE_API_KEY: apiKey } : {}) },
    stderr: "pipe",
  });
  const client = new Client({ name: "noresponse-mcp-tests", version: "0.0.0" });
  await client.connect(transport);
  return client;
}

/**
 * The Worker's fetch handler behind a local HTTP server, with an in-memory
 * stand-in for the Durable Object namespace that holds a session's transport.
 */
export async function workerServer({ serverURL }) {
  process.env.SERVER_URL = serverURL;
  const worker = await import(join(ROOT, "esm", "cloudflare-worker", "cloudflare-worker.js"));
  const SessionObject = Object.values(worker).find((value) => typeof value === "function" && typeof value.serve === "function");
  const objects = new Map();
  let next = 0;
  const id = (name) => ({ toString: () => name });
  const namespace = {
    newUniqueId: () => id(`session-${++next}`.padEnd(64, "0")),
    idFromString: (name) => id(name),
    get(objectId) {
      const name = objectId.toString();
      if (!objects.has(name)) objects.set(name, new SessionObject({ id: objectId }));
      return objects.get(name);
    },
  };
  const env = new Proxy({ ASSETS: { fetch: async () => new Response("Not Found", { status: 404 }) } }, {
    get: (target, prop) => (prop in target ? target[prop] : namespace),
    has: () => true,
  });
  const server = http.createServer(async (req, res) => {
    const body = await readBody(req);
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: Object.entries(req.headers).flatMap(([name, value]) => (Array.isArray(value) ? value.map((v) => [name, v]) : [[name, value]])),
      body: body.length ? body : undefined,
    });
    const response = await worker.default.fetch(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (!response.body) {
      res.end();
      return;
    }
    const reader = response.body.getReader();
    req.on("close", () => reader.cancel().catch(() => {}));
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  });
  const url = await listen(server);
  return {
    url,
    close: () => new Promise((resolve) => {
      server.closeAllConnections();
      server.close(resolve);
    }),
  };
}

/** An MCP client for the hosted server, sending the caller's key. */
export async function httpClient({ url, apiKey }) {
  const transport = new StreamableHTTPClientTransport(new URL("/mcp", url), {
    requestInit: { headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {} },
  });
  const client = new Client({ name: "noresponse-mcp-tests", version: "0.0.0" });
  await client.connect(transport);
  return client;
}

/** The parsed JSON of a tool result's first text item. */
export function json(result, index = 0) {
  return JSON.parse(result.content[index].text);
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
