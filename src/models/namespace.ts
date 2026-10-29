import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.
 */
export const Namespace = {
  Customer: "customer",
} as const;
/**
 * Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.
 */
export type Namespace = ClosedEnum<typeof Namespace>;

export const Namespace$zodSchema = z.enum([
  "customer",
]).describe(
  "Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.",
);
