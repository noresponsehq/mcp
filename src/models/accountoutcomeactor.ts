import * as z from "zod";

export type AccountOutcomeActor = {
  type?: "api_key" | undefined;
  key_id: string;
};

export const AccountOutcomeActor$zodSchema: z.ZodType<AccountOutcomeActor> = z
  .object({
    key_id: z.string(),
    type: z.literal("api_key").default("api_key").optional(),
  });
