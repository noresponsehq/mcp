import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
 */
export const ListEntryAction = {
  Block: "block",
  Allow: "allow",
} as const;
/**
 * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
 */
export type ListEntryAction = ClosedEnum<typeof ListEntryAction>;

export const ListEntryAction$zodSchema = z.enum([
  "block",
  "allow",
]).describe(
  "block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.",
);
