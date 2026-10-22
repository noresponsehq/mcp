import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
 */
export const Outcome = {
  ConfirmedAbuse: "confirmed_abuse",
  AccountTakeover: "account_takeover",
  Chargeback: "chargeback",
  FalsePositive: "false_positive",
  Legitimate: "legitimate",
  Unknown: "unknown",
} as const;
/**
 * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
 */
export type Outcome = ClosedEnum<typeof Outcome>;

export const Outcome$zodSchema = z.enum([
  "confirmed_abuse",
  "account_takeover",
  "chargeback",
  "false_positive",
  "legitimate",
  "unknown",
]).describe(
  "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
);
