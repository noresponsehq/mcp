import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
 */
export const ScreeningPlatformCoverageStatus = {
  Covered: "covered",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
  Failed: "failed",
  Unavailable: "unavailable",
} as const;
/**
 * covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.
 */
export type ScreeningPlatformCoverageStatus = ClosedEnum<
  typeof ScreeningPlatformCoverageStatus
>;

export const ScreeningPlatformCoverageStatus$zodSchema = z.enum([
  "covered",
  "none_found",
  "inaccessible",
  "failed",
  "unavailable",
]).describe(
  "covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.",
);
