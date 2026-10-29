import * as z from "zod";
import {
  AuditEventTargetType,
  AuditEventTargetType$zodSchema,
} from "./auditeventtargettype.js";

export type AuditEventTarget = {
  type: AuditEventTargetType;
  id?: string | undefined;
};

export const AuditEventTarget$zodSchema: z.ZodType<AuditEventTarget> = z.object(
  {
    id: z.string().optional().describe("The resource's id, when it has one."),
    type: AuditEventTargetType$zodSchema.describe(
      "The kind of resource the change acted on.",
    ),
  },
);
