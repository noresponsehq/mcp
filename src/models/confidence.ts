import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.
 */
export const Confidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Unavailable: "unavailable",
} as const;
/**
 * Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.
 */
export type Confidence = ClosedEnum<typeof Confidence>;

export const Confidence$zodSchema = z.enum([
  "low",
  "medium",
  "high",
  "unavailable",
]).describe(
  "Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.",
);
