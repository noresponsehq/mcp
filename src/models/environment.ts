import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The environment whose endpoints receive this event: live, or test for the workspace's test environment.
 */
export const Environment = {
  Live: "live",
  Test: "test",
} as const;
/**
 * The environment whose endpoints receive this event: live, or test for the workspace's test environment.
 */
export type Environment = ClosedEnum<typeof Environment>;

export const Environment$zodSchema = z.enum([
  "live",
  "test",
]).describe(
  "The environment whose endpoints receive this event: live, or test for the workspace's test environment.",
);
