import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const AccountOutcomeActorType = {
  ApiKey: "api_key",
  User: "user",
} as const;
export type AccountOutcomeActorType = ClosedEnum<
  typeof AccountOutcomeActorType
>;

export const AccountOutcomeActorType$zodSchema = z.enum([
  "api_key",
  "user",
]);
