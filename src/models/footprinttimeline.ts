import * as z from "zod";
import {
  FootprintFamily,
  FootprintFamily$zodSchema,
} from "./footprintfamily.js";

/**
 * One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.
 */
export type FootprintTimeline = {
  first_seen_year: number;
  last_seen_year: number;
  span_years: number;
  last_active_year?: number | undefined;
  sites: number;
  families: Array<FootprintFamily>;
};

export const FootprintTimeline$zodSchema: z.ZodType<FootprintTimeline> = z
  .object({
    families: z.array(FootprintFamily$zodSchema),
    first_seen_year: z.int(),
    last_active_year: z.int().optional(),
    last_seen_year: z.int(),
    sites: z.int(),
    span_years: z.int(),
  }).describe(
    "One identifier's dated footprint across every source: the first and last year any event was seen, the years between them, the latest year a source dated activity (omitted when none did), how many distinct sites and which kinds of evidence saw it.",
  );
