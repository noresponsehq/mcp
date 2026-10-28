import * as z from "zod";

export type CredentialAssociationActor = {
  type?: "api_key" | undefined;
  key_id: string;
};

export const CredentialAssociationActor$zodSchema: z.ZodType<
  CredentialAssociationActor
> = z.object({
  key_id: z.string(),
  type: z.literal("api_key").default("api_key").optional(),
});
