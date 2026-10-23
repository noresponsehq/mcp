import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const EventType = {
  AssessmentUpdated: "assessment.updated",
} as const;
export type EventType = ClosedEnum<typeof EventType>;

export const EventType$zodSchema = z.enum([
  "assessment.updated",
]);
