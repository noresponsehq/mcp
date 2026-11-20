import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * standard reads the bio and the last 100 posts of each profile.
 */
export const Depth = {
  Standard: "standard",
} as const;
/**
 * standard reads the bio and the last 100 posts of each profile.
 */
export type Depth = ClosedEnum<typeof Depth>;

export const Depth$zodSchema = z.enum([
  "standard",
]).describe("standard reads the bio and the last 100 posts of each profile.");
