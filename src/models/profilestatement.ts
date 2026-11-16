import * as z from "zod";
import { Basis, Basis$zodSchema } from "./basis.js";
import { Certainty, Certainty$zodSchema } from "./certainty.js";
import {
  ProfileCitation,
  ProfileCitation$zodSchema,
} from "./profilecitation.js";
import { Topic, Topic$zodSchema } from "./topic.js";

export type ProfileStatement = {
  topic: Topic;
  text: string;
  certainty: Certainty;
  basis: Basis;
  alternatives: Array<string>;
  evidence: Array<ProfileCitation>;
};

export const ProfileStatement$zodSchema: z.ZodType<ProfileStatement> = z.object(
  {
    alternatives: z.array(z.string()).describe(
      "Other explanations to keep open for an inference.",
    ),
    basis: Basis$zodSchema.describe(
      "stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.",
    ),
    certainty: Certainty$zodSchema.describe(
      "confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.",
    ),
    evidence: z.array(ProfileCitation$zodSchema).describe(
      "Every record, post or check the statement rests on.",
    ),
    text: z.string(),
    topic: Topic$zodSchema,
  },
);
