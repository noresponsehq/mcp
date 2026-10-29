import * as z from "zod";
import {
  PolicyPreviewRequestFlowsAccountCreation,
  PolicyPreviewRequestFlowsAccountCreation$zodSchema,
} from "./policypreviewrequestflowsaccountcreation.js";
import {
  PolicyPreviewRequestFlowsLogin,
  PolicyPreviewRequestFlowsLogin$zodSchema,
} from "./policypreviewrequestflowslogin.js";
import {
  PolicyPreviewRequestFlowsPurchase,
  PolicyPreviewRequestFlowsPurchase$zodSchema,
} from "./policypreviewrequestflowspurchase.js";

export type PolicyPreviewRequestFlows = {
  account_creation?: PolicyPreviewRequestFlowsAccountCreation | undefined;
  login?: PolicyPreviewRequestFlowsLogin | undefined;
  purchase?: PolicyPreviewRequestFlowsPurchase | undefined;
};

export const PolicyPreviewRequestFlows$zodSchema: z.ZodType<
  PolicyPreviewRequestFlows
> = z.object({
  account_creation: PolicyPreviewRequestFlowsAccountCreation$zodSchema
    .optional(),
  login: PolicyPreviewRequestFlowsLogin$zodSchema.optional(),
  purchase: PolicyPreviewRequestFlowsPurchase$zodSchema.optional(),
});
