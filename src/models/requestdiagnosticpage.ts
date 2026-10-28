import * as z from "zod";
import {
  RequestDiagnostic,
  RequestDiagnostic$zodSchema,
} from "./requestdiagnostic.js";

/**
 * Authenticated attempts in a bounded interval, newest first. Keep the same filters when paging.
 */
export type RequestDiagnosticPage = {
  items: Array<RequestDiagnostic>;
  next_cursor?: string | undefined;
};

export const RequestDiagnosticPage$zodSchema: z.ZodType<RequestDiagnosticPage> =
  z.object({
    items: z.array(RequestDiagnostic$zodSchema),
    next_cursor: z.string().optional(),
  }).describe(
    "Authenticated attempts in a bounded interval, newest first. Keep the same filters when paging.",
  );
