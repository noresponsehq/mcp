import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
 */
export const OnExpiry = {
  Allow: "allow",
  Review: "review",
  Block: "block",
} as const;
/**
 * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
 */
export type OnExpiry = ClosedEnum<typeof OnExpiry>;

export const OnExpiry$zodSchema = z.enum([
  "allow",
  "review",
  "block",
]).describe(
  "The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.",
);
