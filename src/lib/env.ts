import * as z from "zod";

export interface Env {
  NORESPONSE_API_KEY?: string | undefined;

  NORESPONSE_DEBUG?: boolean | undefined;
}

export const envSchema: z.ZodType<Env> = z.object({
  NORESPONSE_API_KEY: z.string().optional(),

  NORESPONSE_DEBUG: z.coerce.boolean().optional(),
});

let envMemo: Env | undefined = undefined;
/**
 * Reads and validates environment variables.
 */
export function env(): Env {
  if (envMemo) {
    return envMemo;
  }

  const globals = globalThis as {
    process?: { env?: Record<string, string | undefined> };
    Deno?: { env?: { toObject?: () => Record<string, string | undefined> } };
  };

  envMemo = envSchema.parse(
    globals.process?.env ?? globals.Deno?.env?.toObject?.() ?? {},
  );
  return envMemo;
}

/**
 * Clears the cached env object. Useful for testing with a fresh environment.
 */
export function resetEnv() {
  envMemo = undefined;
}
