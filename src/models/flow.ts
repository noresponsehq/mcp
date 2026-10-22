import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The provider flow the assessment gates. Absent means signup.
 */
export const Flow = {
  Signup: "signup",
  Login: "login",
  Recovery: "recovery",
  ProfileChange: "profile_change",
} as const;
/**
 * The provider flow the assessment gates. Absent means signup.
 */
export type Flow = ClosedEnum<typeof Flow>;

export const Flow$zodSchema = z.enum([
  "signup",
  "login",
  "recovery",
  "profile_change",
]).describe("The provider flow the assessment gates. Absent means signup.");
