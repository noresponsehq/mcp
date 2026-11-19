import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Identifier = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  Name: "name",
} as const;
export type Identifier = ClosedEnum<typeof Identifier>;

export const Identifier$zodSchema = z.enum([
  "email",
  "phone",
  "username",
  "name",
]);
