import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
  Unstated: "unstated",
} as const;
export type ListAttendeesRole = ClosedEnum<typeof ListAttendeesRole>;

export const ListAttendeesRole$zodSchema = z.enum([
  "guest",
  "crew",
  "vendor",
  "press",
  "unstated",
]);
