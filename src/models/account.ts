import * as z from "zod";
import {
  AccountDecisionsByFlow,
  AccountDecisionsByFlow$zodSchema,
} from "./accountdecisionsbyflow.js";
import { AccountRisk, AccountRisk$zodSchema } from "./accountrisk.js";

/**
 * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
 */
export type Account = {
  schema_version?: "1" | undefined;
  id: string;
  risk: AccountRisk;
  decisions_by_flow: AccountDecisionsByFlow;
  assessment_id: string;
  updated_at: string;
  risk_version: number;
};

export const Account$zodSchema: z.ZodType<Account> = z.object({
  assessment_id: z.string().describe(
    "The assessment the current risk comes from.",
  ),
  decisions_by_flow: AccountDecisionsByFlow$zodSchema.describe(
    "The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its account_creation thresholds, so the flows differ only where it set them.",
  ),
  id: z.string().describe(
    "The account_id the workspace sends with its assessments.",
  ),
  risk: AccountRisk$zodSchema,
  risk_version: z.int().describe(
    "The version of the account's current risk. It increases every time the account's current risk or decisions_by_flow changes, and does not decrease. Of two copies of an account, the one with the higher risk_version is newer. account.risk_changed carries the risk_version that its change made.",
  ),
  schema_version: z.literal("1").default("1").optional().describe(
    "Version of the body shape.",
  ),
  updated_at: z.string().describe(
    "updated_at of that assessment's latest revision.",
  ),
}).describe(
  "Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).",
);
