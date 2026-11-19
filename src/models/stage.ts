import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Stage = {
  Lookup: "lookup",
  LookupTyping: "lookup_typing",
  Platforms: "platforms",
  Written: "written",
  LatePlatforms: "late_platforms",
  LateLookup: "late_lookup",
  AiTyping: "ai_typing",
  Analysis: "analysis",
  Rating: "rating",
} as const;
export type Stage = ClosedEnum<typeof Stage>;

export const Stage$zodSchema = z.enum([
  "lookup",
  "lookup_typing",
  "platforms",
  "written",
  "late_platforms",
  "late_lookup",
  "ai_typing",
  "analysis",
  "rating",
]);
