import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.
 */
export const BreachExposed = {
  Email: "email",
  Username: "username",
  Name: "name",
  Password: "password",
  PasswordHash: "password_hash",
  Phone: "phone",
  Address: "address",
  Dob: "dob",
  Ip: "ip",
  Payment: "payment",
  SecurityQa: "security_qa",
} as const;
/**
 * The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.
 */
export type BreachExposed = ClosedEnum<typeof BreachExposed>;

export const BreachExposed$zodSchema = z.enum([
  "email",
  "username",
  "name",
  "password",
  "password_hash",
  "phone",
  "address",
  "dob",
  "ip",
  "payment",
  "security_qa",
]).describe(
  "The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.",
);
