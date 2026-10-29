import * as z from "zod";
import { Member, Member$zodSchema } from "./member.js";

/**
 * GET /v1/workspaces/{workspace_id}/members: the workspace's active members, oldest first, at most 100.
 */
export type MemberList = { items: Array<Member> };

export const MemberList$zodSchema: z.ZodType<MemberList> = z.object({
  items: z.array(Member$zodSchema),
}).describe(
  "GET /v1/workspaces/{workspace_id}/members: the workspace's active members, oldest first, at most 100.",
);
