import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Metric, Metric$zodSchema } from "./metric.js";
import {
  UsageCountDepth,
  UsageCountDepth$zodSchema,
} from "./usagecountdepth.js";

export type UsageCount = {
  environment: AuditSettingsEnvironment;
  day: string;
  metric: Metric;
  flow?: Flow | undefined;
  depth?: UsageCountDepth | undefined;
  count: number;
};

export const UsageCount$zodSchema: z.ZodType<UsageCount> = z.object({
  count: z.int(),
  day: z.string(),
  depth: UsageCountDepth$zodSchema.optional().describe("assessments only."),
  environment: AuditSettingsEnvironment$zodSchema,
  flow: Flow$zodSchema.optional().describe("assessments only."),
  metric: Metric$zodSchema.describe(
    "assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: people a screening recorded a final result for, one per person per screening; a failed person counts only when its lookups were kept.",
  ),
});
