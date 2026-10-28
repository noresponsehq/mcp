import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * decision, recommendation and band: the first answer's. flow: the assessment's. list_match: the action of the list entry that decided the account when it was first answered. reason: a reason the first answer fired, with its impact band. lane: an evidence lane the first answer listed in incomplete_sources. country and asn: the submitted IP's, from the IP data.
 */
export const AggregateDimension = {
  Decision: "decision",
  Flow: "flow",
  Recommendation: "recommendation",
  Band: "band",
  Reason: "reason",
  Lane: "lane",
  Country: "country",
  Asn: "asn",
  ListMatch: "list_match",
} as const;
/**
 * decision, recommendation and band: the first answer's. flow: the assessment's. list_match: the action of the list entry that decided the account when it was first answered. reason: a reason the first answer fired, with its impact band. lane: an evidence lane the first answer listed in incomplete_sources. country and asn: the submitted IP's, from the IP data.
 */
export type AggregateDimension = ClosedEnum<typeof AggregateDimension>;

export const AggregateDimension$zodSchema = z.enum([
  "decision",
  "flow",
  "recommendation",
  "band",
  "reason",
  "lane",
  "country",
  "asn",
  "list_match",
]).describe(
  "decision, recommendation and band: the first answer's. flow: the assessment's. list_match: the action of the list entry that decided the account when it was first answered. reason: a reason the first answer fired, with its impact band. lane: an evidence lane the first answer listed in incomplete_sources. country and asn: the submitted IP's, from the IP data.",
);
