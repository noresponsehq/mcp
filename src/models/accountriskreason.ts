import * as z from "zod";
import { ReasonCode, ReasonCode$zodSchema } from "./reasoncode.js";
import {
  ReasonIdentifier,
  ReasonIdentifier$zodSchema,
} from "./reasonidentifier.js";

export type AccountRiskReason = {
  code: ReasonCode;
  weight: number;
  identifier?: ReasonIdentifier | undefined;
};

export const AccountRiskReason$zodSchema: z.ZodType<AccountRiskReason> = z
  .object({
    code: ReasonCode$zodSchema.describe(
      "A stable reason code. New codes may appear; ignore any you do not know.",
    ),
    identifier: ReasonIdentifier$zodSchema.optional().describe(
      "The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.",
    ),
    weight: z.int(),
  });
