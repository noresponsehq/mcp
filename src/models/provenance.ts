import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Customer-submitted input. It does not mean the customer or NoResponse verified ownership.
 */
export const Provenance = {
  Submitted: "submitted",
} as const;
/**
 * Customer-submitted input. It does not mean the customer or NoResponse verified ownership.
 */
export type Provenance = ClosedEnum<typeof Provenance>;

export const Provenance$zodSchema = z.enum([
  "submitted",
]).describe(
  "Customer-submitted input. It does not mean the customer or NoResponse verified ownership.",
);
