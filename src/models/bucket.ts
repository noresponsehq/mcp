import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Bucket = {
  Hour: "hour",
  Day: "day",
} as const;
export type Bucket = ClosedEnum<typeof Bucket>;

export const Bucket$zodSchema = z.enum([
  "hour",
  "day",
]);
