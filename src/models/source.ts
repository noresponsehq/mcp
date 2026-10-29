import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Source = {
  Requests: "requests",
  WebhookAttempts: "webhook_attempts",
} as const;
export type Source = ClosedEnum<typeof Source>;

export const Source$zodSchema = z.enum([
  "requests",
  "webhook_attempts",
]);
