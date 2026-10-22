import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.
 */
export const IdentifierKind = {
  Email: "email",
  Username: "username",
  Phone: "phone",
  Ip: "ip",
} as const;
/**
 * Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.
 */
export type IdentifierKind = ClosedEnum<typeof IdentifierKind>;

export const IdentifierKind$zodSchema = z.enum([
  "email",
  "username",
  "phone",
  "ip",
]).describe(
  "Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.",
);
