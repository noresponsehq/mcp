import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
  Unstated: "unstated",
} as const;
export type ListPeopleRole = ClosedEnum<typeof ListPeopleRole>;

export const ListPeopleRole$zodSchema = z.enum([
  "guest",
  "crew",
  "vendor",
  "press",
  "unstated",
]);
