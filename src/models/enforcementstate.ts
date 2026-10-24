import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.
 */
export const EnforcementState = {
  Onboarding: "onboarding",
  Provisional: "provisional",
  Active: "active",
  Restricted: "restricted",
  Rejected: "rejected",
} as const;
/**
 * The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.
 */
export type EnforcementState = ClosedEnum<typeof EnforcementState>;

export const EnforcementState$zodSchema = z.enum([
  "onboarding",
  "provisional",
  "active",
  "restricted",
  "rejected",
]).describe(
  "The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.",
);
