import * as z from "zod";

export type CredentialAssociationRetiredBy = {
  type?: "api_key" | undefined;
  key_id: string;
};

export const CredentialAssociationRetiredBy$zodSchema: z.ZodType<
  CredentialAssociationRetiredBy
> = z.object({
  key_id: z.string(),
  type: z.literal("api_key").default("api_key").optional(),
});
