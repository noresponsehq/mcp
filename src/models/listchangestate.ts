import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListChangeState = {
  Propagating: "propagating",
  Completed: "completed",
} as const;
export type ListChangeState = ClosedEnum<typeof ListChangeState>;

export const ListChangeState$zodSchema = z.enum([
  "propagating",
  "completed",
]);
