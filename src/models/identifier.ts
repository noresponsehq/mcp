import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Identifier = {
  Email: "email",
  Username: "username",
} as const;
export type Identifier = ClosedEnum<typeof Identifier>;

export const Identifier$zodSchema = z.enum([
  "email",
  "username",
]);
