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
  ListWebhookDeliveriesRequest,
  ListWebhookDeliveriesRequest$zodSchema,
} from "../models/listwebhookdeliveriesop.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

export enum ListDeliveriesAcceptEnum {
  applicationJsonAccept = "application/json",
  applicationProblemPlusJsonAccept = "application/problem+json",
}

/**
 * List an endpoint's delivery attempts.
 *
 * @remarks
 * Every POST the endpoint received, newest first: the event id and type, which attempt it was, whether it was a replay, delivered or failed, the response code, why it failed and how long it took. Attempts are kept for 30 days, or your retention_days when that is shorter, and are deleted with the assessment they carried. Requires the webhooks scope. Read-only and safe to retry. The cursor is opaque and bound to your tenant and the endpoint; a tampered or expired cursor answers 400 invalid_cursor.
 */
export function webhookEndpointsListDeliveries(
  client$: NoResponseCore,
  request: ListWebhookDeliveriesRequest,
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
  request: ListWebhookDeliveriesRequest,
  options?: RequestOptions & {
    acceptHeaderOverride?: ListDeliveriesAcceptEnum;
  },
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
    (value$) => ListWebhookDeliveriesRequest$zodSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = null;

  const pathParams$ = {
    endpoint_id: encodeSimple("endpoint_id", payload$.endpoint_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path$ = pathToFunc("/v1/webhooks/{endpoint_id}/deliveries")(
    pathParams$,
  );
  const query$ = encodeFormQuery({
    "cursor": payload$.cursor,
    "limit": payload$.limit,
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
    operationID: "listWebhookDeliveries",
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
