import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.
 */
export const Origin = {
  Api: "api",
  Lookup: "lookup",
} as const;
/**
 * api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.
 */
export type Origin = ClosedEnum<typeof Origin>;

export const Origin$zodSchema = z.enum([
  "api",
  "lookup",
]).describe(
  "api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.",
);
