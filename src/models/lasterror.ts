import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const LastError = {
  ScreeningCapExceeded: "screening_cap_exceeded",
  ScreeningUnavailable: "screening_unavailable",
  PersonNotFound: "person_not_found",
  IdempotencyKeyReused: "idempotency_key_reused",
} as const;
export type LastError = ClosedEnum<typeof LastError>;

export const LastError$zodSchema = z.enum([
  "screening_cap_exceeded",
  "screening_unavailable",
  "person_not_found",
  "idempotency_key_reused",
]);
