import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.
 */
export const Basis = {
  Stated: "stated",
  Inferred: "inferred",
  Absence: "absence",
} as const;
/**
 * stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.
 */
export type Basis = ClosedEnum<typeof Basis>;

export const Basis$zodSchema = z.enum([
  "stated",
  "inferred",
  "absence",
]).describe(
  "stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.",
);
