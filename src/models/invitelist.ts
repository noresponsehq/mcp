import * as z from "zod";
import { Invite, Invite$zodSchema } from "./invite.js";

/**
 * GET /v1/workspaces/{workspace_id}/invites: the workspace's pending invites, oldest first, at most 50, with no token.
 */
export type InviteList = { items: Array<Invite> };

export const InviteList$zodSchema: z.ZodType<InviteList> = z.object({
  items: z.array(Invite$zodSchema),
}).describe(
  "GET /v1/workspaces/{workspace_id}/invites: the workspace's pending invites, oldest first, at most 50, with no token.",
);
