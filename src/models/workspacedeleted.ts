import * as z from "zod";
import { Environment, Environment$zodSchema } from "./environment.js";

/**
 * Terminal for the receiving endpoint's environment: its workspace was deleted. Every key of the environment already answers 401, its assessments and accounts are gone, and no further event follows. The workspace id is not reused, so a later event naming it cannot arrive.
 */
export type WorkspaceDeleted = {
  workspace_id: string;
  environment: Environment;
  deleted_at: string;
};

export const WorkspaceDeleted$zodSchema: z.ZodType<WorkspaceDeleted> = z.object(
  {
    deleted_at: z.string().describe(
      "When the deletion took effect, equal to deleted_at in the DELETE answer.",
    ),
    environment: Environment$zodSchema.describe(
      "The environment whose endpoints receive this event: live, or test for the workspace's test environment.",
    ),
    workspace_id: z.string().describe(
      "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
    ),
  },
).describe(
  "Terminal for the receiving endpoint's environment: its workspace was deleted. Every key of the environment already answers 401, its assessments and accounts are gone, and no further event follows. The workspace id is not reused, so a later event naming it cannot arrive.",
);
