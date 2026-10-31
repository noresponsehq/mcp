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
import { tool$accountsAssociateCredential } from "./tools/accountsAssociateCredential.js";
import { tool$accountsDelete } from "./tools/accountsDelete.js";
import { tool$accountsExport } from "./tools/accountsExport.js";
import { tool$accountsGet } from "./tools/accountsGet.js";
import { tool$accountsListAssessments } from "./tools/accountsListAssessments.js";
import { tool$accountsListChanged } from "./tools/accountsListChanged.js";
import { tool$accountsListCredentials } from "./tools/accountsListCredentials.js";
import { tool$accountsListDecisions } from "./tools/accountsListDecisions.js";
import { tool$accountsListEnforcements } from "./tools/accountsListEnforcements.js";
import { tool$accountsListLinked } from "./tools/accountsListLinked.js";
import { tool$accountsListOutcomes } from "./tools/accountsListOutcomes.js";
import { tool$accountsRecordEnforcement } from "./tools/accountsRecordEnforcement.js";
import { tool$accountsRecordOutcome } from "./tools/accountsRecordOutcome.js";
import { tool$accountsRetireCredential } from "./tools/accountsRetireCredential.js";
import { tool$accountsRetrieveDecision } from "./tools/accountsRetrieveDecision.js";
import { tool$accountsSearch } from "./tools/accountsSearch.js";
import { tool$assessmentsAggregate } from "./tools/assessmentsAggregate.js";
import { tool$assessmentsBindAccount } from "./tools/assessmentsBindAccount.js";
import { tool$assessmentsCreate } from "./tools/assessmentsCreate.js";
import { tool$assessmentsDelete } from "./tools/assessmentsDelete.js";
import { tool$assessmentsGet } from "./tools/assessmentsGet.js";
import { tool$assessmentsQuery } from "./tools/assessmentsQuery.js";
import { tool$assessmentsRecordOutcome } from "./tools/assessmentsRecordOutcome.js";
import { tool$assessmentsRetrieveVersion } from "./tools/assessmentsRetrieveVersion.js";
import { tool$assessmentsSearch } from "./tools/assessmentsSearch.js";
import { tool$auditConfigureStream } from "./tools/auditConfigureStream.js";
import { tool$auditGetRetention } from "./tools/auditGetRetention.js";
import { tool$auditList } from "./tools/auditList.js";
import { tool$auditListStreams } from "./tools/auditListStreams.js";
import { tool$auditRemoveStream } from "./tools/auditRemoveStream.js";
import { tool$auditReplayStream } from "./tools/auditReplayStream.js";
import { tool$auditUpdateRetention } from "./tools/auditUpdateRetention.js";
import { tool$erasuresGet } from "./tools/erasuresGet.js";
import { tool$evaluationsCancel } from "./tools/evaluationsCancel.js";
import { tool$evaluationsCreate } from "./tools/evaluationsCreate.js";
import { tool$evaluationsGet } from "./tools/evaluationsGet.js";
import { tool$evaluationsGetResult } from "./tools/evaluationsGetResult.js";
import { tool$evaluationsList } from "./tools/evaluationsList.js";
import { tool$evaluationsPublish } from "./tools/evaluationsPublish.js";
import { tool$exportsCancel } from "./tools/exportsCancel.js";
import { tool$exportsCreate } from "./tools/exportsCreate.js";
import { tool$exportsDownloadChunk } from "./tools/exportsDownloadChunk.js";
import { tool$exportsGet } from "./tools/exportsGet.js";
import { tool$exportsList } from "./tools/exportsList.js";
import { tool$exportsRetry } from "./tools/exportsRetry.js";
import { tool$integrationsCreate } from "./tools/integrationsCreate.js";
import { tool$integrationsDelete } from "./tools/integrationsDelete.js";
import { tool$integrationsList } from "./tools/integrationsList.js";
import { tool$integrationsRotate } from "./tools/integrationsRotate.js";
import { tool$invitesList } from "./tools/invitesList.js";
import { tool$invitesRevoke } from "./tools/invitesRevoke.js";
import { tool$keysList } from "./tools/keysList.js";
import { tool$keysRevoke } from "./tools/keysRevoke.js";
import { tool$listsChange } from "./tools/listsChange.js";
import { tool$listsCreate } from "./tools/listsCreate.js";
import { tool$listsDelete } from "./tools/listsDelete.js";
import { tool$listsGetChange } from "./tools/listsGetChange.js";
import { tool$listsList } from "./tools/listsList.js";
import { tool$listsPreview } from "./tools/listsPreview.js";
import { tool$membersList } from "./tools/membersList.js";
import { tool$membersRemove } from "./tools/membersRemove.js";
import { tool$membersUpdate } from "./tools/membersUpdate.js";
import { tool$operationsSummarize } from "./tools/operationsSummarize.js";
import { tool$requestsAggregate } from "./tools/requestsAggregate.js";
import { tool$requestsList } from "./tools/requestsList.js";
import { tool$reviewsAddSubject } from "./tools/reviewsAddSubject.js";
import { tool$reviewsComment } from "./tools/reviewsComment.js";
import { tool$reviewsCreate } from "./tools/reviewsCreate.js";
import { tool$reviewsCreateView } from "./tools/reviewsCreateView.js";
import { tool$reviewsDeleteSubject } from "./tools/reviewsDeleteSubject.js";
import { tool$reviewsDeleteView } from "./tools/reviewsDeleteView.js";
import { tool$reviewsExport } from "./tools/reviewsExport.js";
import { tool$reviewsGet } from "./tools/reviewsGet.js";
import { tool$reviewsList } from "./tools/reviewsList.js";
import { tool$reviewsListComments } from "./tools/reviewsListComments.js";
import { tool$reviewsListResolutions } from "./tools/reviewsListResolutions.js";
import { tool$reviewsListSubjects } from "./tools/reviewsListSubjects.js";
import { tool$reviewsListViews } from "./tools/reviewsListViews.js";
import { tool$reviewsQuery } from "./tools/reviewsQuery.js";
import { tool$reviewsResolve } from "./tools/reviewsResolve.js";
import { tool$reviewsUpdate } from "./tools/reviewsUpdate.js";
import { tool$reviewsUpdateView } from "./tools/reviewsUpdateView.js";
import { tool$settingsGet } from "./tools/settingsGet.js";
import { tool$settingsListHistory } from "./tools/settingsListHistory.js";
import { tool$settingsPreview } from "./tools/settingsPreview.js";
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
    version: "0.11.12",
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
  tool(tool$assessmentsAggregate);
  tool(tool$assessmentsSearch);
  tool(tool$assessmentsRetrieveVersion);
  tool(tool$assessmentsBindAccount);
  tool(tool$accountsListChanged);
  tool(tool$accountsGet);
  tool(tool$accountsDelete);
  tool(tool$accountsListAssessments);
  tool(tool$accountsListLinked);
  tool(tool$accountsRecordEnforcement);
  tool(tool$accountsListEnforcements);
  tool(tool$accountsRecordOutcome);
  tool(tool$accountsListOutcomes);
  tool(tool$accountsRetrieveDecision);
  tool(tool$accountsAssociateCredential);
  tool(tool$accountsListCredentials);
  tool(tool$accountsRetireCredential);
  tool(tool$accountsExport);
  tool(tool$accountsListDecisions);
  tool(tool$accountsSearch);
  tool(tool$keysList);
  tool(tool$keysRevoke);
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
  tool(tool$settingsPreview);
  tool(tool$requestsList);
  tool(tool$requestsAggregate);
  tool(tool$listsList);
  tool(tool$listsCreate);
  tool(tool$listsDelete);
  tool(tool$listsPreview);
  tool(tool$listsChange);
  tool(tool$listsGetChange);
  tool(tool$reviewsList);
  tool(tool$reviewsCreate);
  tool(tool$reviewsGet);
  tool(tool$reviewsUpdate);
  tool(tool$reviewsResolve);
  tool(tool$reviewsListComments);
  tool(tool$reviewsComment);
  tool(tool$reviewsListResolutions);
  tool(tool$reviewsListViews);
  tool(tool$reviewsCreateView);
  tool(tool$reviewsUpdateView);
  tool(tool$reviewsDeleteView);
  tool(tool$reviewsExport);
  tool(tool$reviewsListSubjects);
  tool(tool$reviewsAddSubject);
  tool(tool$reviewsDeleteSubject);
  tool(tool$reviewsQuery);
  tool(tool$erasuresGet);
  tool(tool$exportsCreate);
  tool(tool$exportsList);
  tool(tool$exportsGet);
  tool(tool$exportsCancel);
  tool(tool$exportsRetry);
  tool(tool$exportsDownloadChunk);
  tool(tool$evaluationsList);
  tool(tool$evaluationsCreate);
  tool(tool$evaluationsGet);
  tool(tool$evaluationsGetResult);
  tool(tool$evaluationsCancel);
  tool(tool$evaluationsPublish);
  tool(tool$operationsSummarize);

  if (deps.dynamic) {
    registerDynamicTools(deps.logger, server, getClient, toolMap, scopes);
  }

  registerMCPExtensions(register satisfies Register);

  return { server, tools };
}
