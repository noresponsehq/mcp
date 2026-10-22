import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
 */
export const WebhookEndpointState = {
  Unverified: "unverified",
  Verified: "verified",
  Disabled: "disabled",
} as const;
/**
 * unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.
 */
export type WebhookEndpointState = ClosedEnum<typeof WebhookEndpointState>;

export const WebhookEndpointState$zodSchema = z.enum([
  "unverified",
  "verified",
  "disabled",
]).describe(
  "unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.",
);
