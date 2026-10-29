import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ResultStatus = {
  NoChange: "no_change",
  ProposalRequiresReview: "proposal_requires_review",
} as const;
export type ResultStatus = ClosedEnum<typeof ResultStatus>;

export const ResultStatus$zodSchema = z.enum([
  "no_change",
  "proposal_requires_review",
]);
