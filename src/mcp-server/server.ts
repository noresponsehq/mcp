import { McpServer } from "@modelcontextprotocol/server";
import { NoResponseCore } from "../core.js";
import { SDKOptions } from "../lib/config.js";
import type { ConsoleLogger } from "./console-logger.js";
import { Register } from "./extensions.js";
import { createRegisterPrompt } from "./prompts.js";
import {
  createRegisterResource,
  createRegisterResourceTemplate,
} from "./resources.js";
import { MCPScope } from "./scopes.js";
import { registerMCPExtensions } from "./server.extensions.js";
import {
  createRegisterTool,
  MCPToolAnnotationFilter,
  registerDynamicTools,
} from "./tools.js";
import { tool$assessmentsCreate } from "./tools/assessmentsCreate.js";
import { tool$assessmentsGet } from "./tools/assessmentsGet.js";
import { tool$assessmentsQuery } from "./tools/assessmentsQuery.js";
import { tool$assessmentsRecordOutcome } from "./tools/assessmentsRecordOutcome.js";

export function createMCPServer(deps: {
  logger: ConsoleLogger;
  allowedTools?: string[] | undefined;
  dynamic?: boolean | undefined;
  scopes?: MCPScope[] | undefined;
  annotationFilter?: MCPToolAnnotationFilter | undefined;
  getSDK?: () => NoResponseCore;
  serverURL?: string | undefined;
  security?: SDKOptions["security"] | undefined;
  serverIdx?: SDKOptions["serverIdx"] | undefined;
}) {
  const server = new McpServer({
    name: "NoResponse",
    version: "0.1.0",
  });

  const getClient = deps.getSDK || (() =>
    new NoResponseCore({
      security: deps.security,
      serverURL: deps.serverURL,
      serverIdx: deps.serverIdx,
      debugLogger: deps.logger.level === "debug"
        ? {
          log: (...args) => console.log(...args),
          group: (...args) => console.group(...args),
          groupEnd: (...args) => console.groupEnd(...args),
        }
        : undefined,
    }));

  const scopes = new Set(deps.scopes);

  const allowedTools = deps.allowedTools && new Set(deps.allowedTools);
  const [tool, tools, toolMap] = createRegisterTool(
    deps.logger,
    server,
    getClient,
    scopes,
    allowedTools,
    deps.dynamic,
    deps.annotationFilter,
  );
  const resource = createRegisterResource(
    deps.logger,
    server,
    getClient,
    scopes,
  );
  const resourceTemplate = createRegisterResourceTemplate(
    deps.logger,
    server,
    getClient,
    scopes,
  );
  const prompt = createRegisterPrompt(deps.logger, server, getClient, scopes);
  const register = { tool, resource, resourceTemplate, prompt };
  void register; // suppress unused warnings

  tool(tool$assessmentsCreate);
  tool(tool$assessmentsGet);
  tool(tool$assessmentsRecordOutcome);
  tool(tool$assessmentsQuery);

  if (deps.dynamic) {
    registerDynamicTools(deps.logger, server, getClient, toolMap, scopes);
  }

  registerMCPExtensions(register satisfies Register);

  return { server, tools };
}
