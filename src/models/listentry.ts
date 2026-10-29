import * as z from "zod";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import {
  ListEntryAction,
  ListEntryAction$zodSchema,
} from "./listentryaction.js";
import { ListEntryKind, ListEntryKind$zodSchema } from "./listentrykind.js";

/**
 * One entry of an environment's list: an exact email or an email domain that decides an account whatever its score. An account matches when one of its admitted assessments sent the email, or an email of the domain. A block entry decides block for every flow and an allow entry decides allow; when both match, block wins. The account's risk carries the list_match reason with the entry's id, and its score stays the one the assessment's facts give. A held flow still waits for its investigation.
 */
export type ListEntry = {
  id: string;
  workspace_id: string;
  environment: KeyEnvironment;
  kind: ListEntryKind;
  value: string;
  action: ListEntryAction;
  note?: string | undefined;
  created_at: string;
  created_by: string;
  expires_at?: string | undefined;
};

export const ListEntry$zodSchema: z.ZodType<ListEntry> = z.object({
  action: ListEntryAction$zodSchema.describe(
    "block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.",
  ),
  created_at: z.string(),
  created_by: z.string().describe(
    "The external user id of the member who added the entry through the console, or the prefix (nrk_<environment>_<key id>) of the management key that added it.",
  ),
  environment: KeyEnvironment$zodSchema.describe(
    "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
  ),
  expires_at: z.string().optional().describe(
    "Optional expiry. An expired entry stops matching immediately; bounded maintenance removes it and propagates account risk changes.",
  ),
  id: z.string().describe("The entry's id: lst_ and a ULID."),
  kind: ListEntryKind$zodSchema.describe(
    "email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.",
  ),
  note: z.string().optional().describe(
    "Why the entry exists, for the people who manage the list. It is shown with the entry and decides nothing.",
  ),
  value: z.string().describe(
    "The value the entry matches, in canonical form: an email lower-cased whole, or a domain lower-cased and taken to its registrable domain (mail.example.co.uk is stored as example.co.uk).",
  ),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "One entry of an environment's list: an exact email or an email domain that decides an account whatever its score. An account matches when one of its admitted assessments sent the email, or an email of the domain. A block entry decides block for every flow and an allow entry decides allow; when both match, block wins. The account's risk carries the list_match reason with the entry's id, and its score stays the one the assessment's facts give. A held flow still waits for its investigation.",
);
