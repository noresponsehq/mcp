import * as z from "zod";

/**
 * Download one authorized export chunk.
 */
export type CustomerExportChunk = {
  export_id: string;
  index: number;
  generation: number;
  sha256: string;
  data: string;
  next_chunk?: number | undefined;
};

export const CustomerExportChunk$zodSchema: z.ZodType<CustomerExportChunk> = z
  .object({
    data: z.string().describe(
      "Base64-encoded UTF-8 JSON Lines, at most 256 KiB decoded. Each line is a typed customer export record. Decode and concatenate chunks in index order within the same generation.",
    ),
    export_id: z.string(),
    generation: z.int(),
    index: z.int(),
    next_chunk: z.int().optional(),
    sha256: z.string(),
  }).describe("Download one authorized export chunk.");
