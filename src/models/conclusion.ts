import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Conclusion = {
  Benign: "benign",
  Abuse: "abuse",
  Inconclusive: "inconclusive",
} as const;
export type Conclusion = ClosedEnum<typeof Conclusion>;

export const Conclusion$zodSchema = z.enum([
  "benign",
  "abuse",
  "inconclusive",
]);
