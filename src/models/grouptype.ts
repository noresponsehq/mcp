import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What the group's people share: an event, an organisation, a place or another attribute.
 */
export const GroupType = {
  Event: "event",
  Organisation: "organisation",
  Place: "place",
  Custom: "custom",
} as const;
/**
 * What the group's people share: an event, an organisation, a place or another attribute.
 */
export type GroupType = ClosedEnum<typeof GroupType>;

export const GroupType$zodSchema = z.enum([
  "event",
  "organisation",
  "place",
  "custom",
]).describe(
  "What the group's people share: an event, an organisation, a place or another attribute.",
);
