import * as z from "zod";

export type IdentifierSubmission = {
  value: string;
  assessment_id: string;
  submitted_at: string;
};

export const IdentifierSubmission$zodSchema: z.ZodType<IdentifierSubmission> = z
  .object({
    assessment_id: z.string().describe(
      "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
    ),
    submitted_at: z.string().describe("When assessment_id was created."),
    value: z.string().describe(
      "The original value submitted in assessment_id. Under canonical or mailbox matching the two accounts' values can differ.",
    ),
  });
