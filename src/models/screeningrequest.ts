import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

export const ScreeningRequestPlatform = {
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
export type ScreeningRequestPlatform = ClosedEnum<
  typeof ScreeningRequestPlatform
>;

export const ScreeningRequestPlatform$zodSchema = z.enum([
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
 * Screens the event's attendees no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<ScreeningRequestPlatform>;
};

export const ScreeningRequest$zodSchema: z.ZodType<ScreeningRequest> = z.object(
  {
    depth: ScreeningDepth$zodSchema,
    platforms: z.array(ScreeningRequestPlatform$zodSchema),
  },
).describe(
  "Screens the event's attendees no screening has reached and everyone on watch or escalated.",
);
