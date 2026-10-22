import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 401 answer can carry.
 */
export const AuthenticationErrorCode = {
  Unauthorized: "unauthorized",
} as const;
/**
 * Machine codes an HTTP 401 answer can carry.
 */
export type AuthenticationErrorCode = ClosedEnum<
  typeof AuthenticationErrorCode
>;

export const AuthenticationErrorCode$zodSchema = z.enum([
  "unauthorized",
]).describe("Machine codes an HTTP 401 answer can carry.");
