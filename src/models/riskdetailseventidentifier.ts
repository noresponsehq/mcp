import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const RiskDetailsEventIdentifier = {
  Email: "email",
  Username: "username",
} as const;
export type RiskDetailsEventIdentifier = ClosedEnum<
  typeof RiskDetailsEventIdentifier
>;

export const RiskDetailsEventIdentifier$zodSchema = z.enum([
  "email",
  "username",
]);
