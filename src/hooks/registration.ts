/**
 * Hook registration. Hand-written; the generator leaves this file alone.
 */
import { IdempotencyKeyHook } from "./idempotency.js";
import { Hooks } from "./types.js";

export function initHooks(hooks: Hooks) {
  hooks.registerBeforeCreateRequestHook(new IdempotencyKeyHook());
}
