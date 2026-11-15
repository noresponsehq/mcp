import * as z from "zod";
import { PersonMatch, PersonMatch$zodSchema } from "./personmatch.js";
import {
  WorkspacePerson,
  WorkspacePerson$zodSchema,
} from "./workspaceperson.js";

/**
 * Create or reuse a workspace person.
 */
export type WorkspacePersonResult = {
  person: WorkspacePerson;
  suggested_matches: Array<PersonMatch>;
  created: boolean;
};

export const WorkspacePersonResult$zodSchema: z.ZodType<WorkspacePersonResult> =
  z.object({
    created: z.boolean(),
    person: WorkspacePerson$zodSchema,
    suggested_matches: z.array(PersonMatch$zodSchema),
  }).describe("Create or reuse a workspace person.");
