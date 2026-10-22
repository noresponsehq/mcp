import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 404 answer can carry.
 */
export const NotFoundErrorCode = {
  NotFound: "not_found",
} as const;
/**
 * Machine codes an HTTP 404 answer can carry.
 */
export type NotFoundErrorCode = ClosedEnum<typeof NotFoundErrorCode>;

export const NotFoundErrorCode$zodSchema = z.enum([
  "not_found",
]).describe("Machine codes an HTTP 404 answer can carry.");
