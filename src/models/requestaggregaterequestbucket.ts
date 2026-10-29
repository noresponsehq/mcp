import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const RequestAggregateRequestBucket = {
  Hour: "hour",
  Day: "day",
} as const;
export type RequestAggregateRequestBucket = ClosedEnum<
  typeof RequestAggregateRequestBucket
>;

export const RequestAggregateRequestBucket$zodSchema = z.enum([
  "hour",
  "day",
]);
