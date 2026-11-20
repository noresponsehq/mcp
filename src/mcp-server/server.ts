import { McpServer } from "@modelcontextprotocol/server";
import { NoResponseCore } from "../core.js";
import { SDKOptions } from "../lib/config.js";
import type { ConsoleLogger } from "./console-logger.js";
import { createRegisterPrompt } from "./prompts.js";
import {
  createRegisterResource,
  createRegisterResourceTemplate,
} from "./resources.js";
import { MCPScope } from "./scopes.js";
import {
  createRegisterTool,
  MCPToolAnnotationFilter,
  registerDynamicTools,
} from "./tools.js";
import { tool$auditConfigureStream } from "./tools/auditConfigureStream.js";
import { tool$auditGetRetention } from "./tools/auditGetRetention.js";
import { tool$auditList } from "./tools/auditList.js";
import { tool$auditListStreams } from "./tools/auditListStreams.js";
import { tool$auditRemoveStream } from "./tools/auditRemoveStream.js";
import { tool$auditReplayStream } from "./tools/auditReplayStream.js";
import { tool$auditUpdateRetention } from "./tools/auditUpdateRetention.js";
import { tool$erasuresGet } from "./tools/erasuresGet.js";
import { tool$exportsCancel } from "./tools/exportsCancel.js";
import { tool$exportsCreate } from "./tools/exportsCreate.js";
import { tool$exportsDownloadChunk } from "./tools/exportsDownloadChunk.js";
import { tool$exportsGet } from "./tools/exportsGet.js";
import { tool$exportsList } from "./tools/exportsList.js";
import { tool$exportsRetry } from "./tools/exportsRetry.js";
import { tool$investigationsCancel } from "./tools/investigationsCancel.js";
import { tool$investigationsCreate } from "./tools/investigationsCreate.js";
import { tool$investigationsGet } from "./tools/investigationsGet.js";
import { tool$investigationsList } from "./tools/investigationsList.js";
import { tool$invitesList } from "./tools/invitesList.js";
import { tool$invitesRevoke } from "./tools/invitesRevoke.js";
import { tool$keysList } from "./tools/keysList.js";
import { tool$keysRevoke } from "./tools/keysRevoke.js";
import { tool$membersList } from "./tools/membersList.js";
import { tool$membersRemove } from "./tools/membersRemove.js";
import { tool$membersUpdate } from "./tools/membersUpdate.js";
import { tool$peopleCreate } from "./tools/peopleCreate.js";
import { tool$peopleDelete } from "./tools/peopleDelete.js";
import { tool$peopleGet } from "./tools/peopleGet.js";
import { tool$peopleJudgeRecord } from "./tools/peopleJudgeRecord.js";
import { tool$peopleList } from "./tools/peopleList.js";
import { tool$peopleReviewChange } from "./tools/peopleReviewChange.js";
import { tool$peopleRunSearch } from "./tools/peopleRunSearch.js";
import { tool$peopleSchedule } from "./tools/peopleSchedule.js";
import { tool$peopleStartSearch } from "./tools/peopleStartSearch.js";
import { tool$requestsAggregate } from "./tools/requestsAggregate.js";
import { tool$requestsList } from "./tools/requestsList.js";
import { tool$settingsGet } from "./tools/settingsGet.js";
import { tool$settingsListHistory } from "./tools/settingsListHistory.js";
import { tool$settingsRestore } from "./tools/settingsRestore.js";
import { tool$settingsUpdate } from "./tools/settingsUpdate.js";
import { tool$usageGet } from "./tools/usageGet.js";
import { tool$webhookEndpointsAggregate } from "./tools/webhookEndpointsAggregate.js";
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
    version: "0.22.0",
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

  tool(tool$keysList);
  tool(tool$keysRevoke);
  tool(tool$webhookEndpointsList);
  tool(tool$webhookEndpointsCreate);
  tool(tool$webhookEndpointsDelete);
  tool(tool$webhookEndpointsRotateSigningKey);
  tool(tool$webhookEndpointsSendTestEvent);
  tool(tool$webhookEndpointsListDeliveries);
  tool(tool$webhookEndpointsReplayDelivery);
  tool(tool$webhookEndpointsAggregate);
  tool(tool$membersList);
  tool(tool$membersUpdate);
  tool(tool$membersRemove);
  tool(tool$auditList);
  tool(tool$auditGetRetention);
  tool(tool$auditUpdateRetention);
  tool(tool$auditListStreams);
  tool(tool$auditConfigureStream);
  tool(tool$auditRemoveStream);
  tool(tool$auditReplayStream);
  tool(tool$usageGet);
  tool(tool$invitesList);
  tool(tool$invitesRevoke);
  tool(tool$settingsGet);
  tool(tool$settingsUpdate);
  tool(tool$settingsListHistory);
  tool(tool$settingsRestore);
  tool(tool$requestsList);
  tool(tool$requestsAggregate);
  tool(tool$erasuresGet);
  tool(tool$exportsCreate);
  tool(tool$exportsList);
  tool(tool$exportsGet);
  tool(tool$exportsCancel);
  tool(tool$exportsRetry);
  tool(tool$exportsDownloadChunk);
  tool(tool$peopleList);
  tool(tool$peopleCreate);
  tool(tool$peopleGet);
  tool(tool$peopleDelete);
  tool(tool$peopleJudgeRecord);
  tool(tool$peopleStartSearch);
  tool(tool$peopleRunSearch);
  tool(tool$peopleReviewChange);
  tool(tool$peopleSchedule);
  tool(tool$investigationsList);
  tool(tool$investigationsCreate);
  tool(tool$investigationsGet);
  tool(tool$investigationsCancel);

  if (deps.dynamic) {
    registerDynamicTools(deps.logger, server, getClient, toolMap, scopes);
  }

  return { server, tools };
}
