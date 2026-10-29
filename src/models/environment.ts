import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Environment = {
  Live: "live",
  Test: "test",
  Workspace: "workspace",
} as const;
export type Environment = ClosedEnum<typeof Environment>;

export const Environment$zodSchema = z.enum([
  "live",
  "test",
  "workspace",
]);
