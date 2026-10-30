import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { AccountType, AccountType$zodSchema } from "./accounttype.js";
import { FailureReason, FailureReason$zodSchema } from "./failurereason.js";
import { Identifier, Identifier$zodSchema } from "./identifier.js";
import { SignalOutcome, SignalOutcome$zodSchema } from "./signaloutcome.js";

export const SignIn = {
  Password: "password",
  Google: "google",
  Facebook: "facebook",
  Apple: "apple",
  Microsoft: "microsoft",
  Sso: "sso",
  Other: "other",
} as const;
export type SignIn = ClosedEnum<typeof SignIn>;

export const SignIn$zodSchema = z.enum([
  "password",
  "google",
  "facebook",
  "apple",
  "microsoft",
  "sso",
  "other",
]);

/**
 * One online-account search of the signup's email or username, detailed view only. name and domain name the platform searched, not a provider. outcome is the search's signal outcome: found, not_found, or a failure (blocked, unavailable, inconclusive) with its reason; a failure is not reported as not_found. The members after reason are what the platform returned beside an account it found, each absent when it did not say.
 */
export type OnlineAccount = {
  name: string;
  domain: string;
  identifier: Identifier;
  outcome: SignalOutcome;
  reason?: FailureReason | undefined;
  sign_in?: Array<SignIn> | undefined;
  email_verified?: boolean | undefined;
  blocked?: boolean | undefined;
  account_type?: AccountType | undefined;
  has_avatar?: boolean | undefined;
  first_name_prefix?: string | undefined;
};

export const OnlineAccount$zodSchema: z.ZodType<OnlineAccount> = z.object({
  account_type: AccountType$zodSchema.optional().describe(
    "personal, or business: an account a company or school manages.",
  ),
  blocked: z.boolean().optional().describe(
    "Whether the platform says the account is blocked or suspended.",
  ),
  domain: z.string().describe(
    "The platform's domain, lower case: the host its logo is fetched for.",
  ),
  email_verified: z.boolean().optional().describe(
    "Whether the platform says the account's email is verified.",
  ),
  first_name_prefix: z.string().optional().describe(
    "The first letters of the account holder's first name, as the platform shows them (Life360 shows two and hides the rest). It is evidence only: it does not change the score or the consistency results.",
  ),
  has_avatar: z.boolean().optional().describe(
    "Whether the account has its own profile picture rather than the platform's default. The picture is not returned.",
  ),
  identifier: Identifier$zodSchema,
  name: z.string().describe("The platform's name, such as Adobe or GitHub."),
  outcome: SignalOutcome$zodSchema.describe(
    "Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.",
  ),
  reason: FailureReason$zodSchema.optional().describe(
    "Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.",
  ),
  sign_in: z.array(SignIn$zodSchema).optional().describe(
    "How the account signs in, as the platform reports it, sorted: a password, a Google, Facebook, Apple or Microsoft account, the organisation's single sign-on, or another method.",
  ),
}).describe(
  "One online-account search of the signup's email or username, detailed view only. name and domain name the platform searched, not a provider. outcome is the search's signal outcome: found, not_found, or a failure (blocked, unavailable, inconclusive) with its reason; a failure is not reported as not_found. The members after reason are what the platform returned beside an account it found, each absent when it did not say.",
);
