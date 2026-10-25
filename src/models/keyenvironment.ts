import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
 */
export const KeyEnvironment = {
  Live: "live",
  Test: "test",
} as const;
/**
 * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
 */
export type KeyEnvironment = ClosedEnum<typeof KeyEnvironment>;

export const KeyEnvironment$zodSchema = z.enum([
  "live",
  "test",
]).describe(
  "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
);
