import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";
import { ScreeningSpend, ScreeningSpend$zodSchema } from "./screeningspend.js";
import {
  ScreeningStatus,
  ScreeningStatus$zodSchema,
} from "./screeningstatus.js";

/**
 * A screening and its progress.
 */
export type Screening = {
  id: string;
  group_id: string;
  environment: AuditSettingsEnvironment;
  status: ScreeningStatus;
  depth: ScreeningDepth;
  platforms: Array<HandlePlatform>;
  requested_by: string;
  created_at: string;
  started_at?: string | undefined;
  finished_at?: string | undefined;
  expires_at: string;
  people_total: number;
  people_done: number;
  people_flagged: number;
  people_failed: number;
  people_partial: number;
  estimated_spend: number;
  spent: number;
  spend: ScreeningSpend;
  error_code?: string | undefined;
};

export const Screening$zodSchema: z.ZodType<Screening> = z.object({
  created_at: z.string(),
  depth: ScreeningDepth$zodSchema,
  environment: AuditSettingsEnvironment$zodSchema,
  error_code: z.string().optional().describe(
    "Why a failed or cancelled screening stopped.",
  ),
  estimated_spend: z.int().describe(
    "What the screening was estimated to cost when it started, in minor units of USD (cents): its people at its depth and platforms. Until the screening finishes, what it has not yet spent counts against the environment's screening_daily_cap.",
  ),
  expires_at: z.string().describe(
    "A screening still running then fails with error_code expired.",
  ),
  finished_at: z.string().optional(),
  group_id: z.string(),
  id: z.string(),
  people_done: z.int().describe(
    "People screened so far, failed ones included.",
  ),
  people_failed: z.int(),
  people_flagged: z.int(),
  people_partial: z.int().describe(
    "People screened with some requested platform not covered; their coverage names which.",
  ),
  people_total: z.int().describe("People selected when the screening started."),
  platforms: z.array(HandlePlatform$zodSchema),
  requested_by: z.string(),
  spend: ScreeningSpend$zodSchema.describe(
    "What screening cost, in US cents, in total and per implementation.",
  ),
  spent: z.int().describe(
    "What the people it has screened recorded, in minor units of USD. Each counts toward the UTC day it was recorded on; a failed person records nothing.",
  ),
  started_at: z.string().optional(),
  status: ScreeningStatus$zodSchema.describe(
    "partial finished with some people or platforms not covered; people_failed and people_partial count them.",
  ),
}).describe("A screening and its progress.");
