import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.
 */
export const Transport = {
  Backend: "backend",
  Browser: "browser",
  ProviderHook: "provider_hook",
} as const;
/**
 * Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.
 */
export type Transport = ClosedEnum<typeof Transport>;

export const Transport$zodSchema = z.enum([
  "backend",
  "browser",
  "provider_hook",
]).describe(
  "Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.",
);
