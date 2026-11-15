import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The kind of resource the change acted on.
 */
export const AuditEventTargetType = {
  Workspace: "workspace",
  Member: "member",
  Invite: "invite",
  Key: "key",
  Setting: "setting",
  WebhookEndpoint: "webhook_endpoint",
  Integration: "integration",
  Billing: "billing",
  Review: "review",
  Person: "person",
  Group: "group",
} as const;
/**
 * The kind of resource the change acted on.
 */
export type AuditEventTargetType = ClosedEnum<typeof AuditEventTargetType>;

export const AuditEventTargetType$zodSchema = z.enum([
  "workspace",
  "member",
  "invite",
  "key",
  "setting",
  "webhook_endpoint",
  "integration",
  "billing",
  "review",
  "person",
  "group",
]).describe("The kind of resource the change acted on.");
