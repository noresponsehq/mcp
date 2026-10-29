import * as z from "zod";
import {
  ErasureReceiptTargetName,
  ErasureReceiptTargetName$zodSchema,
} from "./erasurereceipttargetname.js";
import {
  ErasureReceiptTargetStatus,
  ErasureReceiptTargetStatus$zodSchema,
} from "./erasurereceipttargetstatus.js";

export type ErasureReceiptTarget = {
  name: ErasureReceiptTargetName;
  status: ErasureReceiptTargetStatus;
  completed_at?: string | undefined;
};

export const ErasureReceiptTarget$zodSchema: z.ZodType<ErasureReceiptTarget> = z
  .object({
    completed_at: z.string().optional(),
    name: ErasureReceiptTargetName$zodSchema,
    status: ErasureReceiptTargetStatus$zodSchema,
  });
