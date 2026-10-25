import * as z from "zod";
import { FlowChange, FlowChange$zodSchema } from "./flowchange.js";

/**
 * Use account_creation or its deprecated alias signup, not both.
 */
export type SettingsRequestFlows = {
  account_creation?: FlowChange | undefined;
  login?: FlowChange | undefined;
  purchase?: FlowChange | undefined;
  signup?: FlowChange | undefined;
};

export const SettingsRequestFlows$zodSchema: z.ZodType<SettingsRequestFlows> = z
  .object({
    account_creation: FlowChange$zodSchema.optional().describe(
      "A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.",
    ),
    login: FlowChange$zodSchema.optional().describe(
      "A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.",
    ),
    purchase: FlowChange$zodSchema.optional().describe(
      "A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.",
    ),
    signup: FlowChange$zodSchema.optional().describe(
      "A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.",
    ),
  }).describe("Use account_creation or its deprecated alias signup, not both.");
