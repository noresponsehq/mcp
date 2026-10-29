import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const AuditSettingsEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type AuditSettingsEnvironment = ClosedEnum<
  typeof AuditSettingsEnvironment
>;

export const AuditSettingsEnvironment$zodSchema = z.enum([
  "live",
  "test",
]);
