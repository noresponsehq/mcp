import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Listed and returned members are active.
 */
export const MemberStatus = {
  Active: "active",
} as const;
/**
 * Listed and returned members are active.
 */
export type MemberStatus = ClosedEnum<typeof MemberStatus>;

export const MemberStatus$zodSchema = z.enum([
  "active",
]).describe("Listed and returned members are active.");
