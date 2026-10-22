import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
 */
export const ReasonIdentifier = {
  Email: "email",
  Username: "username",
  Phone: "phone",
  Name: "name",
  Ip: "ip",
  Context: "context",
} as const;
/**
 * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
 */
export type ReasonIdentifier = ClosedEnum<typeof ReasonIdentifier>;

export const ReasonIdentifier$zodSchema = z.enum([
  "email",
  "username",
  "phone",
  "name",
  "ip",
  "context",
]).describe(
  "The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.",
);
