import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.
 */
export const PostsStopped = {
  PlatformLimit: "platform_limit",
  PageLimit: "page_limit",
  RateLimited: "rate_limited",
  Unavailable: "unavailable",
} as const;
/**
 * Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.
 */
export type PostsStopped = ClosedEnum<typeof PostsStopped>;

export const PostsStopped$zodSchema = z.enum([
  "platform_limit",
  "page_limit",
  "rate_limited",
  "unavailable",
]).describe(
  "Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.",
);
