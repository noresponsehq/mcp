export interface Env {
  // Add your Cloudflare Worker environment bindings here
  // For example:
  // MY_KV_NAMESPACE: KVNamespace;
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  NORESPONSE_MCP_MCP: DurableObjectNamespace;
  ASSETS: Fetcher; // For serving static assets
}
