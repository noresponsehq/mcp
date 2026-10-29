import * as z from "zod";
import {
  ErasureReceiptKind,
  ErasureReceiptKind$zodSchema,
} from "./erasurereceiptkind.js";
import {
  ErasureReceiptTarget,
  ErasureReceiptTarget$zodSchema,
} from "./erasurereceipttarget.js";
import {
  ListChangeState,
  ListChangeState$zodSchema,
} from "./listchangestate.js";

/**
 * Acknowledged propagation of a retained erasure record in the calling environment. Pending means the target has not acknowledged completion. Completion covers these serving-system targets only; backup and point-in-time recovery copies expire according to their own retention policy. This receipt contains no subject id or digest. Workspace teardown revokes customer credentials, so obtain required receipts before teardown.
 */
export type ErasureReceipt = {
  id: string;
  kind: ErasureReceiptKind;
  status: ListChangeState;
  assessments_deleted: number;
  requested_at: string;
  completed_at?: string | undefined;
  targets: Array<ErasureReceiptTarget>;
  backup_policy: string;
};

export const ErasureReceipt$zodSchema: z.ZodType<ErasureReceipt> = z.object({
  assessments_deleted: z.int(),
  backup_policy: z.string(),
  completed_at: z.string().optional(),
  id: z.string().describe(
    "Opaque, server-issued erasure receipt id. It contains no subject identifier.",
  ),
  kind: ErasureReceiptKind$zodSchema,
  requested_at: z.string(),
  status: ListChangeState$zodSchema,
  targets: z.array(ErasureReceiptTarget$zodSchema),
}).describe(
  "Acknowledged propagation of a retained erasure record in the calling environment. Pending means the target has not acknowledged completion. Completion covers these serving-system targets only; backup and point-in-time recovery copies expire according to their own retention policy. This receipt contains no subject id or digest. Workspace teardown revokes customer credentials, so obtain required receipts before teardown.",
);
