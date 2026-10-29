import * as z from "zod";
import { Environment, Environment$zodSchema } from "./environment.js";
import {
  WebhookEndpointState,
  WebhookEndpointState$zodSchema,
} from "./webhookendpointstate.js";

export type AuditStream = {
  endpoint_id: string;
  environment: Environment;
  actions: Array<string>;
  created_at: string;
  endpoint_state: WebhookEndpointState;
  last_attempt_at?: string | undefined;
  last_delivered_at?: string | undefined;
};

export const AuditStream$zodSchema: z.ZodType<AuditStream> = z.object({
  actions: z.array(z.string()),
  created_at: z.string(),
  endpoint_id: z.string(),
  endpoint_state: WebhookEndpointState$zodSchema.describe(
    "unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.",
  ),
  environment: Environment$zodSchema,
  last_attempt_at: z.string().optional(),
  last_delivered_at: z.string().optional(),
});
