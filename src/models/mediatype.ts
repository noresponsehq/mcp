import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const MediaType = {
  Image: "image",
  Video: "video",
} as const;
export type MediaType = ClosedEnum<typeof MediaType>;

export const MediaType$zodSchema = z.enum([
  "image",
  "video",
]);
