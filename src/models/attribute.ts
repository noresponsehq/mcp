import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * name_gender is the records' gender against the submitted first name's usual one.
 */
export const Attribute = {
  BirthDate: "birth_date",
  Gender: "gender",
  Nationality: "nationality",
  NameGender: "name_gender",
} as const;
/**
 * name_gender is the records' gender against the submitted first name's usual one.
 */
export type Attribute = ClosedEnum<typeof Attribute>;

export const Attribute$zodSchema = z.enum([
  "birth_date",
  "gender",
  "nationality",
  "name_gender",
]).describe(
  "name_gender is the records' gender against the submitted first name's usual one.",
);
