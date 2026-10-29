import { NoResponseCore } from "../core.js";
import { encodeFormQuery, encodeSimple } from "../lib/encodings.js";
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
  GetUsageRequest,
  GetUsageRequest$zodSchema,
} from "../models/getusageop.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

export enum GetAcceptEnum {
  applicationJsonAccept = "application/json",
  applicationProblemPlusJsonAccept = "application/problem+json",
}

/**
 * Read a workspace's usage.
 *
 * @remarks
 * Read daily usage units for the environments you can access. These counts are unpriced. With live access it also returns the daily console lookup cap: used, limit and resets_at.
 */
export function usageGet(
  client$: NoResponseCore,
  request: GetUsageRequest,
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
  request: GetUsageRequest,
  options?: RequestOptions & { acceptHeaderOverride?: GetAcceptEnum },
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
    (value$) => GetUsageRequest$zodSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = null;

  const pathParams$ = {
    workspace_id: encodeSimple("workspace_id", payload$.workspace_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path$ = pathToFunc("/v1/workspaces/{workspace_id}/usage")(
    pathParams$,
  );
  const query$ = encodeFormQuery({
    "from": payload$.from,
    "to": payload$.to,
  });

  const headers$ = new Headers(compactMap({
    Accept: options?.acceptHeaderOverride
      || "application/json;q=1, application/problem+json;q=0",
  }));
  const securityInput = await extractSecurity(client$._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client$._options,
    baseURL: options?.serverURL ?? client$._baseURL ?? "",
    operationID: "getUsage",
    oAuth2Scopes: null,
    resolvedSecurity: requestSecurity,
    securitySource: client$._options.security,
    retryConfig: options?.retries
      || client$._options.retryConfig
      || {
        strategy: "backoff",
        backoff: {
          initialInterval: 500,
          maxInterval: 8000,
          exponent: 2,
          maxElapsedTime: 30000,
        },
        retryConnectionErrors: true,
      }
      || { strategy: "none" },
    retryCodes: options?.retryCodes || [
      "408",
      "429",
      "5XX",
    ],
  };

  const requestRes = client$._createRequest(context, {
    security: requestSecurity,
    method: "GET",
    baseURL: options?.serverURL,
    path: path$,
    headers: headers$,
    query: query$,
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
