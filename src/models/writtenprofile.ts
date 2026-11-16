import * as z from "zod";
import { ProfileLead, ProfileLead$zodSchema } from "./profilelead.js";
import {
  ProfileStatement,
  ProfileStatement$zodSchema,
} from "./profilestatement.js";
import {
  WrittenProfileErrorCode,
  WrittenProfileErrorCode$zodSchema,
} from "./writtenprofileerrorcode.js";
import {
  WrittenProfileStatus,
  WrittenProfileStatus$zodSchema,
} from "./writtenprofilestatus.js";

export type WrittenProfile = {
  status: WrittenProfileStatus;
  investigation_id: string;
  error_code?: WrittenProfileErrorCode | undefined;
  queued_at: string;
  finished_at: string | null;
  summary?: string | undefined;
  statements: Array<ProfileStatement>;
  leads: Array<ProfileLead>;
};

export const WrittenProfile$zodSchema: z.ZodType<WrittenProfile> = z.object({
  error_code: WrittenProfileErrorCode$zodSchema.optional().describe(
    "Present only when status is failed. no_writer: no profile writer serves this environment. refused: the model refused. not_written: the answer was not a profile, or no statement survived grounding. uncited_statement: a statement or lead cited a record the person does not hold. not_answered: the writer did not answer. worker_attempts_exhausted: the worker stopped retrying.",
  ),
  finished_at: z.string().nullable(),
  investigation_id: z.string().describe(
    "The investigation whose evidence the profile is written from.",
  ),
  leads: z.array(ProfileLead$zodSchema).describe(
    "Values worth searching next, each held by a linked record.",
  ),
  queued_at: z.string(),
  statements: z.array(ProfileStatement$zodSchema).describe(
    "Each fact or inference with its certainty and the evidence it cites. Statements that cited evidence the writer was not sent are dropped before storage.",
  ),
  status: WrittenProfileStatus$zodSchema.describe(
    "queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.",
  ),
  summary: z.string().optional().describe(
    "Present when written: a few plain sentences with the most useful picture first.",
  ),
});
