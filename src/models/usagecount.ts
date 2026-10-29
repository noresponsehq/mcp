import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { Metric, Metric$zodSchema } from "./metric.js";
import {
  UsageCountDepth,
  UsageCountDepth$zodSchema,
} from "./usagecountdepth.js";
import { UsageCountFlow, UsageCountFlow$zodSchema } from "./usagecountflow.js";

export type UsageCount = {
  environment: AuditSettingsEnvironment;
  day: string;
  metric: Metric;
  flow?: UsageCountFlow | undefined;
  depth?: UsageCountDepth | undefined;
  count: number;
};

export const UsageCount$zodSchema: z.ZodType<UsageCount> = z.object({
  count: z.int(),
  day: z.string(),
  depth: UsageCountDepth$zodSchema.optional().describe("assessments only."),
  environment: AuditSettingsEnvironment$zodSchema,
  flow: UsageCountFlow$zodSchema.optional().describe("assessments only."),
  metric: Metric$zodSchema.describe(
    "assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted.",
  ),
});
