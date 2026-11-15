import { NoResponseCore } from "../core.js";
import { encodeJSON, encodeSimple } from "../lib/encodings.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import { APIError } from "../models/errors/apierror.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  ReviewInvestigationRequest,
  ReviewInvestigationRequest$zodSchema,
} from "../models/reviewinvestigationop.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

export enum ReviewAcceptEnum {
  applicationJsonAccept = "application/json",
  applicationProblemPlusJsonAccept = "application/problem+json",
}

/**
 * Record an investigation decision.
 *
 * @remarks
 * Record an investigation decision. The API key determines the workspace and environment.
 */
export function investigationsReview(
  client$: NoResponseCore,
  request: ReviewInvestigationRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    Response,
    | APIError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  return new APIPromise($do(
    client$,
    request,
    options,
  ));
}

async function $do(
  client$: NoResponseCore,
  request: ReviewInvestigationRequest,
  options?: RequestOptions & { acceptHeaderOverride?: ReviewAcceptEnum },
): Promise<
  [
    Result<
      Response,
      | APIError
      | SDKValidationError
      | UnexpectedClientError
      | InvalidRequestError
      | RequestAbortedError
      | RequestTimeoutError
      | ConnectionError
    >,
    APICall,
  ]
> {
  const parsed$ = safeParse(
    request,
    (value$) => ReviewInvestigationRequest$zodSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = encodeJSON("body", payload$.body, { explode: true });

  const pathParams$ = {
    investigation_id: encodeSimple(
      "investigation_id",
      payload$.investigation_id,
      { explode: false, charEncoding: "percent" },
    ),
  };
  const path$ = pathToFunc("/v1/investigations/{investigation_id}/reviews")(
    pathParams$,
  );

  const headers$ = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: options?.acceptHeaderOverride
      || "application/json;q=1, application/problem+json;q=0",
  }));
  const securityInput = await extractSecurity(client$._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client$._options,
    baseURL: options?.serverURL ?? client$._baseURL ?? "",
    operationID: "reviewInvestigation",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client$._options.security,
    retryConfig: options?.retries || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  };

  const requestRes = client$._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path: path$,
    headers: headers$,
    body: body$,
    userAgent: client$._options.userAgent,
    timeoutMs: options?.timeoutMs || client$._options.timeoutMs
      || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req$ = requestRes.value;

  const doResult = await client$._do(req$, {
    context,
    errorCodes: [],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req$ }];
  }
  return [doResult, {
    status: "complete",
    "request": req$,
    response: doResult.value,
  }];
}
