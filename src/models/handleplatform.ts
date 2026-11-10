import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
 */
export const HandlePlatform = {
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
  Synthetic: "synthetic",
} as const;
/**
 * A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
 */
export type HandlePlatform = ClosedEnum<typeof HandlePlatform>;

export const HandlePlatform$zodSchema = z.enum([
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
  "synthetic",
]).describe(
  "A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
);
