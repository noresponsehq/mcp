import * as z from "zod";
import { PersonIdentity, PersonIdentity$zodSchema } from "./personidentity.js";

/**
 * Adds or updates 1 to 500 people. A row naming an existing person of the group (the same external_id, else the same email, else the same phone) updates it.
 */
export type PersonBatchRequest = { people: Array<PersonIdentity> };

export const PersonBatchRequest$zodSchema: z.ZodType<PersonBatchRequest> = z
  .object({
    people: z.array(PersonIdentity$zodSchema),
  }).describe(
    "Adds or updates 1 to 500 people. A row naming an existing person of the group (the same external_id, else the same email, else the same phone) updates it.",
  );
