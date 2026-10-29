import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListImpactTransitionFrom = {
  None: "none",
  Allow: "allow",
  Block: "block",
} as const;
export type ListImpactTransitionFrom = ClosedEnum<
  typeof ListImpactTransitionFrom
>;

export const ListImpactTransitionFrom$zodSchema = z.enum([
  "none",
  "allow",
  "block",
]);
