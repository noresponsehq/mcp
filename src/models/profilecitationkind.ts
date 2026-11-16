import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.
 */
export const ProfileCitationKind = {
  Record: "record",
  Post: "post",
  Check: "check",
} as const;
/**
 * record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.
 */
export type ProfileCitationKind = ClosedEnum<typeof ProfileCitationKind>;

export const ProfileCitationKind$zodSchema = z.enum([
  "record",
  "post",
  "check",
]).describe(
  "record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.",
);
