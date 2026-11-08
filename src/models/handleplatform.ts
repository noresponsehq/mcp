import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

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
} as const;
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
]);
