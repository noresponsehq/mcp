import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.
 */
export const Rating = {
  Unique: "unique",
  Distinctive: "distinctive",
  Common: "common",
} as const;
/**
 * unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.
 */
export type Rating = ClosedEnum<typeof Rating>;

export const Rating$zodSchema = z.enum([
  "unique",
  "distinctive",
  "common",
]).describe(
  "unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.",
);
