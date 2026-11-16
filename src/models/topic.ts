import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Topic = {
  Identity: "identity",
  Location: "location",
  Movement: "movement",
  Timeline: "timeline",
  Interests: "interests",
  Relationships: "relationships",
  Work: "work",
  Education: "education",
  Accounts: "accounts",
  Credentials: "credentials",
  Devices: "devices",
  Absence: "absence",
} as const;
export type Topic = ClosedEnum<typeof Topic>;

export const Topic$zodSchema = z.enum([
  "identity",
  "location",
  "movement",
  "timeline",
  "interests",
  "relationships",
  "work",
  "education",
  "accounts",
  "credentials",
  "devices",
  "absence",
]);
