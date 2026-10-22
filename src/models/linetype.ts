import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const LineType = {
  Mobile: "mobile",
  Voip: "voip",
  Landline: "landline",
  TollFree: "toll_free",
  Other: "other",
} as const;
export type LineType = ClosedEnum<typeof LineType>;

export const LineType$zodSchema = z.enum([
  "mobile",
  "voip",
  "landline",
  "toll_free",
  "other",
]);
