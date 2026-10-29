import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";

/**
 * Read audit retention and available history.
 */
export type AuditSettings = {
  environment: AuditSettingsEnvironment;
  retention_days: number;
  oldest_available_at?: string | undefined;
  capture?: "available_events_only" | undefined;
};

export const AuditSettings$zodSchema: z.ZodType<AuditSettings> = z.object({
  capture: z.literal("available_events_only").default("available_events_only")
    .optional(),
  environment: AuditSettingsEnvironment$zodSchema,
  oldest_available_at: z.string().optional(),
  retention_days: z.int(),
}).describe("Read audit retention and available history.");
