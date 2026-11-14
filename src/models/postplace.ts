import * as z from "zod";

/**
 * A place a post names, as the platform shows it.
 */
export type PostPlace = {
  name: string;
  id?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

export const PostPlace$zodSchema: z.ZodType<PostPlace> = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  id: z.string().optional().describe("The platform's own id of the place."),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  name: z.string(),
}).describe("A place a post names, as the platform shows it.");
