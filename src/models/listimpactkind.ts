import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListImpactKind = {
  Email: "email",
  EmailDomain: "email_domain",
} as const;
export type ListImpactKind = ClosedEnum<typeof ListImpactKind>;

export const ListImpactKind$zodSchema = z.enum([
  "email",
  "email_domain",
]);
