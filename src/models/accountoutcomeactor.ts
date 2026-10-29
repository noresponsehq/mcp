import * as z from "zod";
import {
  AccountOutcomeActorType,
  AccountOutcomeActorType$zodSchema,
} from "./accountoutcomeactortype.js";

export type AccountOutcomeActor = {
  type: AccountOutcomeActorType;
  key_id?: string | undefined;
  external_user_id?: string | undefined;
  console_credential_id?: string | undefined;
  principal_id?: string | undefined;
};

export const AccountOutcomeActor$zodSchema: z.ZodType<AccountOutcomeActor> = z
  .object({
    console_credential_id: z.string().optional(),
    external_user_id: z.string().optional().describe(
      "The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.",
    ),
    key_id: z.string().optional(),
    principal_id: z.string().optional().describe(
      "Opaque, server-assigned member id: mem_ and a 26-character ULID. It stays the same when a removed member is invited back.",
    ),
    type: AccountOutcomeActorType$zodSchema,
  });
