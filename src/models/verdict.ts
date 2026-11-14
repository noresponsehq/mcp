import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
 */
export const Verdict = {
  Joined: "joined",
  Rejected: "rejected",
} as const;
/**
 * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
 */
export type Verdict = ClosedEnum<typeof Verdict>;

export const Verdict$zodSchema = z.enum([
  "joined",
  "rejected",
]).describe(
  "A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.",
);
