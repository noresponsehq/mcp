import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 403 answer can carry.
 */
export const PermissionDeniedErrorCode = {
  WorkspaceForbidden: "workspace_forbidden",
} as const;
/**
 * Machine codes an HTTP 403 answer can carry.
 */
export type PermissionDeniedErrorCode = ClosedEnum<
  typeof PermissionDeniedErrorCode
>;

export const PermissionDeniedErrorCode$zodSchema = z.enum([
  "workspace_forbidden",
]).describe("Machine codes an HTTP 403 answer can carry.");
