import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Direction = {
  Raises: "raises",
  Lowers: "lowers",
  Neutral: "neutral",
} as const;
export type Direction = ClosedEnum<typeof Direction>;

export const Direction$zodSchema = z.enum([
  "raises",
  "lowers",
  "neutral",
]);
