import * as z from "zod";
import { FlowSettings, FlowSettings$zodSchema } from "./flowsettings.js";

export type SettingsFlows = {
  account_creation: FlowSettings;
  login: FlowSettings;
  purchase: FlowSettings;
};

export const SettingsFlows$zodSchema: z.ZodType<SettingsFlows> = z.object({
  account_creation: FlowSettings$zodSchema.describe(
    "One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.",
  ),
  login: FlowSettings$zodSchema.describe(
    "One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.",
  ),
  purchase: FlowSettings$zodSchema.describe(
    "One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.",
  ),
});
