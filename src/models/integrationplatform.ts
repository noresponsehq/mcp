import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The authentication provider that calls the endpoint.
 */
export const IntegrationPlatform = {
  Workos: "workos",
  Auth0: "auth0",
} as const;
/**
 * The authentication provider that calls the endpoint.
 */
export type IntegrationPlatform = ClosedEnum<typeof IntegrationPlatform>;

export const IntegrationPlatform$zodSchema = z.enum([
  "workos",
  "auth0",
]).describe("The authentication provider that calls the endpoint.");
