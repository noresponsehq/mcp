import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: people a screening recorded a final result for, one per person per screening; a failed person counts only when its lookups were kept.
 */
export const Metric = {
  Assessments: "assessments",
  WebhookDeliveries: "webhook_deliveries",
  KeyUsageEvents: "key_usage_events",
  Screenings: "screenings",
} as const;
/**
 * assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: people a screening recorded a final result for, one per person per screening; a failed person counts only when its lookups were kept.
 */
export type Metric = ClosedEnum<typeof Metric>;

export const Metric$zodSchema = z.enum([
  "assessments",
  "webhook_deliveries",
  "key_usage_events",
  "screenings",
]).describe(
  "assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: people a screening recorded a final result for, one per person per screening; a failed person counts only when its lookups were kept.",
);
