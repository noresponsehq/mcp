import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Action = {
  Allow: "allow",
  Block: "block",
} as const;
export type Action = ClosedEnum<typeof Action>;

export const Action$zodSchema = z.enum([
  "allow",
  "block",
]);
