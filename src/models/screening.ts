import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";
import {
  ScreeningStatus,
  ScreeningStatus$zodSchema,
} from "./screeningstatus.js";

export const ScreeningPlatform = {
  Instagram: "instagram",
  X: "x",
  Bluesky: "bluesky",
  Youtube: "youtube",
  Tiktok: "tiktok",
  Facebook: "facebook",
  Threads: "threads",
  Reddit: "reddit",
  Telegram: "telegram",
  Linkedin: "linkedin",
} as const;
export type ScreeningPlatform = ClosedEnum<typeof ScreeningPlatform>;

export const ScreeningPlatform$zodSchema = z.enum([
  "instagram",
  "x",
  "bluesky",
  "youtube",
  "tiktok",
  "facebook",
  "threads",
  "reddit",
  "telegram",
  "linkedin",
]);

/**
 * A screening and its progress.
 */
export type Screening = {
  id: string;
  event_id: string;
  environment: AuditSettingsEnvironment;
  status: ScreeningStatus;
  depth: ScreeningDepth;
  platforms: Array<ScreeningPlatform>;
  requested_by: string;
  created_at: string;
  started_at?: string | undefined;
  finished_at?: string | undefined;
  expires_at: string;
  attendees_total: number;
  attendees_done: number;
  attendees_flagged: number;
  attendees_failed: number;
  estimated_spend: number;
  spent: number;
  error_code?: string | undefined;
};

export const Screening$zodSchema: z.ZodType<Screening> = z.object({
  attendees_done: z.int().describe(
    "Attendees screened so far, failed ones included.",
  ),
  attendees_failed: z.int(),
  attendees_flagged: z.int(),
  attendees_total: z.int().describe(
    "Attendees selected when the screening started.",
  ),
  created_at: z.string(),
  depth: ScreeningDepth$zodSchema,
  environment: AuditSettingsEnvironment$zodSchema,
  error_code: z.string().optional().describe(
    "Why a failed or cancelled screening stopped.",
  ),
  estimated_spend: z.int().describe(
    "What the screening was estimated to cost when it started, in minor units of USD (cents): its attendees at its depth and platforms. Until the screening finishes, what it has not yet spent counts against the environment's screening_daily_cap.",
  ),
  event_id: z.string(),
  expires_at: z.string().describe(
    "A screening still running then fails with error_code expired.",
  ),
  finished_at: z.string().optional(),
  id: z.string(),
  platforms: z.array(ScreeningPlatform$zodSchema),
  requested_by: z.string(),
  spent: z.int().describe(
    "What the attendees it has screened recorded, in minor units of USD. Each counts toward the UTC day it was recorded on; a failed attendee records nothing.",
  ),
  started_at: z.string().optional(),
  status: ScreeningStatus$zodSchema.describe(
    "partial finished with some attendees not covered; attendees_failed counts them.",
  ),
}).describe("A screening and its progress.");
