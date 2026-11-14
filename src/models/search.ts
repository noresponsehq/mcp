import * as z from "zod";
import { ErrorCode, ErrorCode$zodSchema } from "./errorcode.js";
import { SearchKind, SearchKind$zodSchema } from "./searchkind.js";
import { SearchStatus, SearchStatus$zodSchema } from "./searchstatus.js";

/**
 * One search a person started on a value of one of a person's records. Nothing searches again by itself.
 */
export type Search = {
  search_id: string;
  record_id: string;
  field: string;
  table?: string | undefined;
  kind: SearchKind;
  value: string;
  status: SearchStatus;
  rows?: number | undefined;
  sources: number;
  answered: number;
  found: number;
  estimated_spend: number;
  spent: number;
  error_code?: ErrorCode | undefined;
  requested_by: string;
  created_at: string;
  finished_at?: string | undefined;
};

export const Search$zodSchema: z.ZodType<Search> = z.object({
  answered: z.int().describe(
    "How many of them gave a definite answer, found or not found.",
  ),
  created_at: z.string(),
  error_code: ErrorCode$zodSchema.optional().describe(
    "Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.",
  ),
  estimated_spend: z.int().describe(
    "What the search may spend, in US cents, held against the environment's daily screening cap while it runs.",
  ),
  field: z.string().describe("The field of that record that holds the value."),
  finished_at: z.string().optional(),
  found: z.int().describe(
    "How many records the search found. They are among the person report's lookup records, each match naming this search.",
  ),
  kind: SearchKind$zodSchema.describe("The kind of the value searched."),
  record_id: z.string().describe("The record whose value led to the search."),
  requested_by: z.string().describe("Who started the search."),
  rows: z.int().optional().describe(
    "How many breach rows hold the password or hash, counted before the search runs.",
  ),
  search_id: z.string(),
  sources: z.int().describe(
    "How many sources the search asked: the breach search and the account and phone lookups that take the value's kind.",
  ),
  spent: z.int().describe(
    "What the search spent, in US cents, metered as screening work.",
  ),
  status: SearchStatus$zodSchema.describe(
    "A password or hash search is counting, then counted: rows says how many breach rows hold the value, and nothing runs until a person runs it (POST .../searches/{search_id}/run). Any other search is queued, then running. completed: every source it asked answered. partial: some did not. failed: none answered or none could be asked, which says nothing about whether the value is held anywhere.",
  ),
  table: z.string().optional().describe(
    "The one breach table searched, when the search was of one table.",
  ),
  value: z.string().describe(
    "The value searched: the field's cleaned value, else as the source wrote it.",
  ),
}).describe(
  "One search a person started on a value of one of a person's records. Nothing searches again by itself.",
);
