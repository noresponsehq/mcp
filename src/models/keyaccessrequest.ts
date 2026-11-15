import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const KeyAccessRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type KeyAccessRequestDeniedAction = ClosedEnum<
  typeof KeyAccessRequestDeniedAction
>;

export const KeyAccessRequestDeniedAction$zodSchema = z.enum([
  "evidence.read",
  "exports.read",
  "policy.publish",
]);

export type KeyAccessRequest = {
  denied_actions: Array<KeyAccessRequestDeniedAction>;
};

export const KeyAccessRequest$zodSchema: z.ZodType<KeyAccessRequest> = z.object(
  {
    denied_actions: z.array(KeyAccessRequestDeniedAction$zodSchema).describe(
      "Explicit restrictions that override scope grants. An empty list restores the access supplied by the scopes. Rotation preserves these restrictions.",
    ),
  },
);
