import * as z from "zod";

export type AuditSettingsRequest = { retention_days: number };

export const AuditSettingsRequest$zodSchema: z.ZodType<AuditSettingsRequest> = z
  .object({
    retention_days: z.int(),
  });
