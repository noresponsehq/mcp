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
  StartScreeningRequest,
  StartScreeningRequest$zodSchema,
} from "../models/startscreeningop.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

export enum StartScreeningAcceptEnum {
  applicationJsonAccept = "application/json",
  applicationProblemPlusJsonAccept = "application/problem+json",
}

/**
 * Start a screening.
 *
 * @remarks
 * Queues a screening that reruns the full search for every person in the group. One screening of a group runs at a time; it finishes completed, partial (some people not covered, counted in people_failed) or failed, and fails with error_code expired after 24 hours. Idempotency-Key is required and binds the body for the screening's life. The 202 body carries estimated_spend, what the selected people would cost at the depth and platforms. A screening whose estimate exceeds the environment's screening_daily_cap, less the day's recorded spend and what open screenings may still spend, answers 409 screening_cap_exceeded and queues nothing. The test environment screens with a deterministic simulator that contacts no source. A platform that no connector serves in the environment answers 409 screening_unavailable. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.
 */
export function groupsStartScreening(
  client$: NoResponseCore,
  request: StartScreeningRequest,
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
  request: StartScreeningRequest,
  options?: RequestOptions & {
    acceptHeaderOverride?: StartScreeningAcceptEnum;
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
    (value$) => StartScreeningRequest$zodSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = encodeJSON("body", payload$.body, { explode: true });

  const pathParams$ = {
    group_id: encodeSimple("group_id", payload$.group_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path$ = pathToFunc("/v1/groups/{group_id}/screenings")(
    pathParams$,
  );

  const headers$ = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: options?.acceptHeaderOverride
      || "application/json;q=1, application/problem+json;q=0",
    "Idempotency-Key": encodeSimple(
      "Idempotency-Key",
      payload$.idempotencyKey,
      { explode: false, charEncoding: "none" },
    ),
  }));
  const securityInput = await extractSecurity(client$._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client$._options,
    baseURL: options?.serverURL ?? client$._baseURL ?? "",
    operationID: "startScreening",
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
