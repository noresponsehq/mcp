import * as z from "zod";
import { Filter, Filter$zodSchema } from "./filter.js";
import { OwnerType, OwnerType$zodSchema } from "./ownertype.js";

export type ReviewView = {
  id: string;
  name: string;
  owner: string;
  owner_type: OwnerType;
  shared: boolean;
  version: number;
  filter: Filter;
  created_at: string;
  updated_at: string;
  owner_principal_id: string;
};

export const ReviewView$zodSchema: z.ZodType<ReviewView> = z.object({
  created_at: z.string(),
  filter: Filter$zodSchema,
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  owner_principal_id: z.string().describe(
    "Immutable member ID or API key ID, interpreted with owner_type. Ownership survives changes to an external user identity.",
  ),
  owner_type: OwnerType$zodSchema.describe(
    "The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.",
  ),
  shared: z.boolean(),
  updated_at: z.string(),
  version: z.int(),
});
