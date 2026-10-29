import * as z from "zod";

export type KeyActor = { type?: "api_key" | undefined; key_id: string };

export const KeyActor$zodSchema: z.ZodType<KeyActor> = z.object({
  key_id: z.string().describe(
    "The public id of the workspace API key that made the change.",
  ),
  type: z.literal("api_key").default("api_key").optional(),
});
