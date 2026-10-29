import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.
 */
export const OwnerType = {
  User: "user",
  ApiKey: "api_key",
} as const;
/**
 * The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.
 */
export type OwnerType = ClosedEnum<typeof OwnerType>;

export const OwnerType$zodSchema = z.enum([
  "user",
  "api_key",
]).describe(
  "The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.",
);
