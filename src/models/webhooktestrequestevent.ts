import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
 */
export const WebhookTestRequestEvent = {
  EndpointVerification: "endpoint.verification",
  AssessmentUpdated: "assessment.updated",
} as const;
/**
 * endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.
 */
export type WebhookTestRequestEvent = ClosedEnum<
  typeof WebhookTestRequestEvent
>;

export const WebhookTestRequestEvent$zodSchema = z.enum([
  "endpoint.verification",
  "assessment.updated",
]).describe(
  "endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.",
);
