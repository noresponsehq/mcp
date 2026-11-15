import * as z from "zod";
import { PersonIdentity, PersonIdentity$zodSchema } from "./personidentity.js";

/**
 * Adds 1 to 500 workspace people to the group. Reuses an explicit person_id or external_id. Matching email or phone values only suggest people; automatic merging is disabled.
 */
export type PersonBatchRequest = { people: Array<PersonIdentity> };

export const PersonBatchRequest$zodSchema: z.ZodType<PersonBatchRequest> = z
  .object({
    people: z.array(PersonIdentity$zodSchema),
  }).describe(
    "Adds 1 to 500 workspace people to the group. Reuses an explicit person_id or external_id. Matching email or phone values only suggest people; automatic merging is disabled.",
  );
