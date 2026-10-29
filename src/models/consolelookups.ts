import * as z from "zod";

/**
 * The live environment's daily cap on assessments members make through the console (the playground), as spent on the current UTC day. Each console submission with a new Idempotency-Key spends one lookup; a replay spends nothing, and API keys and the test environment spend none. When used reaches limit, the next lookup answers 429 lookup_limit_reached until resets_at. The count is the one the cap enforces.
 */
export type ConsoleLookups = { used: number; limit: number; resets_at: string };

export const ConsoleLookups$zodSchema: z.ZodType<ConsoleLookups> = z.object({
  limit: z.int().describe("Lookups allowed per UTC day."),
  resets_at: z.string().describe(
    "The next reset: the coming midnight UTC, when used returns to 0.",
  ),
  used: z.int().describe("Lookups spent since the last reset."),
}).describe(
  "The live environment's daily cap on assessments members make through the console (the playground), as spent on the current UTC day. Each console submission with a new Idempotency-Key spends one lookup; a replay spends nothing, and API keys and the test environment spend none. When used reaches limit, the next lookup answers 429 lookup_limit_reached until resets_at. The count is the one the cap enforces.",
);
