import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const IdentifierSearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
} as const;
export type IdentifierSearchKind = ClosedEnum<typeof IdentifierSearchKind>;

export const IdentifierSearchKind$zodSchema = z.enum([
  "email",
  "phone",
  "username",
]);
