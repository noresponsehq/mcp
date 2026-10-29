import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
 */
export const Role = {
  Owner: "owner",
  Admin: "admin",
  Developer: "developer",
  Viewer: "viewer",
  Investigator: "investigator",
  Auditor: "auditor",
  Billing: "billing",
} as const;
/**
 * A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.
 */
export type Role = ClosedEnum<typeof Role>;

export const Role$zodSchema = z.enum([
  "owner",
  "admin",
  "developer",
  "viewer",
  "investigator",
  "auditor",
  "billing",
]).describe(
  "A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.",
);
