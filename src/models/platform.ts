import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Client platform. Closed vocabulary keeps integrations stable.
 */
export const Platform = {
  Web: "web",
  Ios: "ios",
  Android: "android",
  Other: "other",
} as const;
/**
 * Client platform. Closed vocabulary keeps integrations stable.
 */
export type Platform = ClosedEnum<typeof Platform>;

export const Platform$zodSchema = z.enum([
  "web",
  "ios",
  "android",
  "other",
]).describe("Client platform. Closed vocabulary keeps integrations stable.");
