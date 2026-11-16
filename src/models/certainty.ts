import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.
 */
export const Certainty = {
  Confirmed: "confirmed",
  Likely: "likely",
  Possible: "possible",
} as const;
/**
 * confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.
 */
export type Certainty = ClosedEnum<typeof Certainty>;

export const Certainty$zodSchema = z.enum([
  "confirmed",
  "likely",
  "possible",
]).describe(
  "confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.",
);
