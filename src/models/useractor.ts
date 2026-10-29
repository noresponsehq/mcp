import * as z from "zod";

export type UserActor = {
  type?: "user" | undefined;
  external_user_id: string;
  console_credential_id: string;
  principal_id?: string | undefined;
};

export const UserActor$zodSchema: z.ZodType<UserActor> = z.object({
  console_credential_id: z.string().describe(
    "The public id of the console credential the user acted through.",
  ),
  external_user_id: z.string().describe(
    "The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.",
  ),
  principal_id: z.string().optional().describe(
    "Stable workspace principal id, retained across identity-provider subject migration. Absent for older events.",
  ),
  type: z.literal("user").default("user").optional(),
});
