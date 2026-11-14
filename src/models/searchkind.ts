import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The kind of the value searched.
 */
export const SearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  PersonName: "person_name",
  Password: "password",
  Hash: "hash",
  Ip: "ip",
} as const;
/**
 * The kind of the value searched.
 */
export type SearchKind = ClosedEnum<typeof SearchKind>;

export const SearchKind$zodSchema = z.enum([
  "email",
  "phone",
  "username",
  "person_name",
  "password",
  "hash",
  "ip",
]).describe("The kind of the value searched.");
