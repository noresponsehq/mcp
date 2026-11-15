import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.
 */
export const SearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  PersonName: "person_name",
  Password: "password",
  Hash: "hash",
  Ip: "ip",
  Domain: "domain",
} as const;
/**
 * The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.
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
  "domain",
]).describe(
  "The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.",
);
