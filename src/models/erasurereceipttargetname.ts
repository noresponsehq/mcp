import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ErasureReceiptTargetName = {
  Serving: "serving",
  Outbox: "outbox",
  Cache: "cache",
  DownstreamProjection: "downstream_projection",
} as const;
export type ErasureReceiptTargetName = ClosedEnum<
  typeof ErasureReceiptTargetName
>;

export const ErasureReceiptTargetName$zodSchema = z.enum([
  "serving",
  "outbox",
  "cache",
  "downstream_projection",
]);
