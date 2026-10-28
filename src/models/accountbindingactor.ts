import * as z from "zod";

export type AccountBindingActor = {
  type?: "api_key" | undefined;
  key_id: string;
};

export const AccountBindingActor$zodSchema: z.ZodType<AccountBindingActor> = z
  .object({
    key_id: z.string(),
    type: z.literal("api_key").default("api_key").optional(),
  });
