import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const KeyKind = {
  Service: "service",
  Personal: "personal",
} as const;
export type KeyKind = ClosedEnum<typeof KeyKind>;

export const KeyKind$zodSchema = z.enum([
  "service",
  "personal",
]);
