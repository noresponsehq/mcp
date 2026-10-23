import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.
 */
export const WebhookDeliveryAttemptStatus = {
  Delivered: "delivered",
  Failed: "failed",
} as const;
/**
 * delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.
 */
export type WebhookDeliveryAttemptStatus = ClosedEnum<
  typeof WebhookDeliveryAttemptStatus
>;

export const WebhookDeliveryAttemptStatus$zodSchema = z.enum([
  "delivered",
  "failed",
]).describe(
  "delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.",
);
