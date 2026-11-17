import * as z from "zod";
import { Rating, Rating$zodSchema } from "./rating.js";

/**
 * How distinctive a searchable value is: an email, phone, username, password, hash, person name or IP. Absent for other values, for a field with no value, and when its rating could not be worked out, such as when a count failed. Linkage weighs a password, hash or username by these numbers: the rarer the value, the more a shared one counts.
 */
export type RecordDistinctive = {
  rating: Rating;
  reason: string;
  rows?: number | undefined;
  pwned?: number | undefined;
  bits?: number | undefined;
};

export const RecordDistinctive$zodSchema: z.ZodType<RecordDistinctive> = z
  .object({
    bits: z.number().optional().describe(
      "How surprising the username is, to one decimal place: a character model spells it about once in 2^bits usernames. Set for a username the model can spell.",
    ),
    pwned: z.int().optional().describe(
      "How many times the Pwned Passwords list holds the password, when it was asked. Set for a password only.",
    ),
    rating: Rating$zodSchema.describe(
      "unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.",
    ),
    reason: z.string().describe(
      "Why, in plain words, such as \"seen 3,861,493 times in breach data\", \"in 4 breach rows\" or \"38 bits, about one in 430 billion usernames\".",
    ),
    rows: z.int().optional().describe(
      "How many breach rows hold the value, when they were counted. Set for a username, password, hash or person name.",
    ),
  }).describe(
    "How distinctive a searchable value is: an email, phone, username, password, hash, person name or IP. Absent for other values, for a field with no value, and when its rating could not be worked out, such as when a count failed. Linkage weighs a password, hash or username by these numbers: the rarer the value, the more a shared one counts.",
  );
