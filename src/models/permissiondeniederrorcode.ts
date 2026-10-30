import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 403 answer can carry.
 */
export const PermissionDeniedErrorCode = {
  WorkspaceForbidden: "workspace_forbidden",
  RoleForbidden: "role_forbidden",
  EmailUnverified: "email_unverified",
  OnboardingInReview: "onboarding_in_review",
  OnboardingRefused: "onboarding_refused",
} as const;
/**
 * Machine codes an HTTP 403 answer can carry.
 */
export type PermissionDeniedErrorCode = ClosedEnum<
  typeof PermissionDeniedErrorCode
>;

export const PermissionDeniedErrorCode$zodSchema = z.enum([
  "workspace_forbidden",
  "role_forbidden",
  "email_unverified",
  "onboarding_in_review",
  "onboarding_refused",
]).describe("Machine codes an HTTP 403 answer can carry.");
