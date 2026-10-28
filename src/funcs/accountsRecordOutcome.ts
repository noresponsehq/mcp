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
  RecordAccountOutcomeRequest,
  RecordAccountOutcomeRequest$zodSchema,
} from "../models/recordaccountoutcomeop.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

export enum RecordOutcomeAcceptEnum {
  applicationJsonAccept = "application/json",
  applicationProblemPlusJsonAccept = "application/problem+json",
}

/**
 * Record or correct an account outcome
 *
 * @remarks
 * Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.
 */
export function accountsRecordOutcome(
  client$: NoResponseCore,
  request: RecordAccountOutcomeRequest,
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
  request: RecordAccountOutcomeRequest,
  options?: RequestOptions & { acceptHeaderOverride?: RecordOutcomeAcceptEnum },
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
    (value$) => RecordAccountOutcomeRequest$zodSchema.parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return [parsed$, { status: "invalid" }];
  }
  const payload$ = parsed$.value;
  const body$ = encodeJSON("body", payload$.body, { explode: true });

  const pathParams$ = {
    account_id: encodeSimple("account_id", payload$.account_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path$ = pathToFunc("/v1/accounts/{account_id}/outcomes")(
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
    operationID: "recordAccountOutcome",
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
