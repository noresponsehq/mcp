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
import { tool$accountsDelete } from "./tools/accountsDelete.js";
import { tool$accountsGet } from "./tools/accountsGet.js";
import { tool$accountsListAssessments } from "./tools/accountsListAssessments.js";
import { tool$assessmentsCreate } from "./tools/assessmentsCreate.js";
import { tool$assessmentsDelete } from "./tools/assessmentsDelete.js";
import { tool$assessmentsGet } from "./tools/assessmentsGet.js";
import { tool$assessmentsQuery } from "./tools/assessmentsQuery.js";
import { tool$assessmentsRecordOutcome } from "./tools/assessmentsRecordOutcome.js";
import { tool$integrationsCreate } from "./tools/integrationsCreate.js";
import { tool$integrationsDelete } from "./tools/integrationsDelete.js";
import { tool$integrationsList } from "./tools/integrationsList.js";
import { tool$integrationsRotate } from "./tools/integrationsRotate.js";
import { tool$webhookEndpointsCreate } from "./tools/webhookEndpointsCreate.js";
import { tool$webhookEndpointsDelete } from "./tools/webhookEndpointsDelete.js";
import { tool$webhookEndpointsList } from "./tools/webhookEndpointsList.js";
import { tool$webhookEndpointsListDeliveries } from "./tools/webhookEndpointsListDeliveries.js";
import { tool$webhookEndpointsReplayDelivery } from "./tools/webhookEndpointsReplayDelivery.js";
import { tool$webhookEndpointsRotateSigningKey } from "./tools/webhookEndpointsRotateSigningKey.js";
import { tool$webhookEndpointsSendTestEvent } from "./tools/webhookEndpointsSendTestEvent.js";

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
    version: "0.2.10",
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
  tool(tool$assessmentsDelete);
  tool(tool$assessmentsRecordOutcome);
  tool(tool$assessmentsQuery);
  tool(tool$accountsGet);
  tool(tool$accountsDelete);
  tool(tool$accountsListAssessments);
  tool(tool$integrationsCreate);
  tool(tool$integrationsList);
  tool(tool$integrationsDelete);
  tool(tool$integrationsRotate);
  tool(tool$webhookEndpointsList);
  tool(tool$webhookEndpointsCreate);
  tool(tool$webhookEndpointsDelete);
  tool(tool$webhookEndpointsRotateSigningKey);
  tool(tool$webhookEndpointsSendTestEvent);
  tool(tool$webhookEndpointsListDeliveries);
  tool(tool$webhookEndpointsReplayDelivery);

  if (deps.dynamic) {
    registerDynamicTools(deps.logger, server, getClient, toolMap, scopes);
  }

  registerMCPExtensions(register satisfies Register);

  return { server, tools };
}
