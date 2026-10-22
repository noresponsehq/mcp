import * as z from "zod";

/**
 * Normalized multi-factor evidence from a verified provider session.
 */
export type AuthContextMfa = {
  present?: boolean | undefined;
  methods?: Array<string> | undefined;
  age_seconds?: number | undefined;
};

export const AuthContextMfa$zodSchema: z.ZodType<AuthContextMfa> = z.object({
  age_seconds: z.int().optional(),
  methods: z.array(z.string()).optional(),
  present: z.boolean().optional(),
}).describe(
  "Normalized multi-factor evidence from a verified provider session.",
);
