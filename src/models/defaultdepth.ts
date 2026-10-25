import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.
 */
export const DefaultDepth = {
  Quick: "quick",
  Full: "full",
} as const;
/**
 * The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.
 */
export type DefaultDepth = ClosedEnum<typeof DefaultDepth>;

export const DefaultDepth$zodSchema = z.enum([
  "quick",
  "full",
]).describe(
  "The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.",
);
