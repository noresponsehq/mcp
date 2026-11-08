import * as z from "zod";

/**
 * An empty object.
 */
export type ScreeningCancelRequest = {};

export const ScreeningCancelRequest$zodSchema: z.ZodType<
  ScreeningCancelRequest
> = z.object({}).describe("An empty object.");
