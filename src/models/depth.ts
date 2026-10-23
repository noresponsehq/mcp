import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.
 */
export const Depth = {
  Quick: "quick",
  Full: "full",
} as const;
/**
 * How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.
 */
export type Depth = ClosedEnum<typeof Depth>;

export const Depth$zodSchema = z.enum([
  "quick",
  "full",
]).describe(
  "How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.",
);
