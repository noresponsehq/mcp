import * as z from "zod";

export type AuditStreamRequest = {
  endpoint_id: string;
  actions?: Array<string> | undefined;
};

export const AuditStreamRequest$zodSchema: z.ZodType<AuditStreamRequest> = z
  .object({
    actions: z.array(z.string()).optional(),
    endpoint_id: z.string(),
  });
